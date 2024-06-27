# PHIND RNA-seq
# -- Gene embeddings similarity
################################################################################
# Author: JE Millar
# Date: 2024-06-27
# Version: 1.0
# Python: 3.10.12
# en: GB UTF-8
################################################################################

import pandas as pd
import numpy as np
from scipy.spatial.distance import pdist, squareform
from scipy.stats import ttest_rel, wilcoxon
import matplotlib.pyplot as plt
import seaborn as sns

#   ____________________________________________________________________________
#   load embeddings                                                         ####

def load_embeddings(file_path):
    return pd.read_csv(file_path)

#   ____________________________________________________________________________
#   assess similarity                                                       ####

def compute_pairwise_distances(embeddings):
    return squareform(pdist(embeddings, metric='euclidean'))

def get_within_study_distances(distance_matrix, study_indices):
    return distance_matrix[np.ix_(study_indices, study_indices)][np.triu_indices(len(study_indices), k=1)]

def get_study_to_random_distances(distance_matrix, study_indices, random_indices):
    return distance_matrix[np.ix_(study_indices, random_indices)].flatten()

def compare_distributions(within_study_distances, study_to_random_distances):
    t_stat, t_pvalue = ttest_rel(within_study_distances, study_to_random_distances[:len(within_study_distances)])
    w_stat, w_pvalue = wilcoxon(within_study_distances - study_to_random_distances[:len(within_study_distances)])
    return t_stat, t_pvalue, w_stat, w_pvalue

#   ____________________________________________________________________________
#   plot                                                                    ####

def plot_distance_distributions(within_study_distances, study_to_random_distances, output_file):
    plt.figure(figsize=(10, 6))
    sns.histplot(within_study_distances, kde=True, label='Within Study Signatures', color='blue', alpha=0.5)
    sns.histplot(study_to_random_distances, kde=True, label='Study to Random Signatures', color='red', alpha=0.5)
    plt.title('Distribution of Pairwise Distances')
    plt.xlabel('Euclidean Distance')
    plt.ylabel('Frequency')
    plt.legend()
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close()

#   ____________________________________________________________________________
#   main                                                                    ####

def main(input_file, output_file):
    df = load_embeddings(input_file)
    
    study_signatures = df[df['Signature'] != 'random']
    random_signatures = df[df['Signature'] == 'random']
    
    study_indices = study_signatures.index.tolist()
    random_indices = random_signatures.index.tolist()
    
    all_embeddings = df.iloc[:, 2:].values
    distance_matrix = compute_pairwise_distances(all_embeddings)
    
    within_study_distances = get_within_study_distances(distance_matrix, study_indices)
    study_to_random_distances = get_study_to_random_distances(distance_matrix, study_indices, random_indices)
    
    t_stat, t_pvalue, w_stat, w_pvalue = compare_distributions(within_study_distances, study_to_random_distances)
    
    print(f"Paired t-test results: statistic={t_stat}, p-value={t_pvalue}")
    print(f"Wilcoxon signed-rank test results: statistic={w_stat}, p-value={w_pvalue}")
    
    plot_distance_distributions(within_study_distances, study_to_random_distances, output_file)
    
    mean_within_study = np.mean(within_study_distances)
    mean_study_to_random = np.mean(study_to_random_distances)
    print(f"Mean distance within study signatures: {mean_within_study}")
    print(f"Mean distance from study to random signatures: {mean_study_to_random}")

if __name__ == "__main__":
    input_file = "./processed_data/embeddings.csv"
    output_file = "./processed_data/distance_distribution.png"
    main(input_file, output_file)