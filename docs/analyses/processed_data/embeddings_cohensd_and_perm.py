# PHIND RNA-seq
# -- Gene embeddings Cohen's d and permutation
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

#   ____________________________________________________________________________
#   cohen's d                                                               ####

def calculate_cohens_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    pooled_std = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    return (np.mean(group1) - np.mean(group2)) / pooled_std

#   ____________________________________________________________________________
#   permutation                                                             ####

def permutation_test(within_study_distances, study_to_random_distances, n_permutations=10000):
    observed_diff = np.mean(within_study_distances) - np.mean(study_to_random_distances)
    combined = np.concatenate([within_study_distances, study_to_random_distances])
    n = len(within_study_distances)
    
    count = 0
    for _ in range(n_permutations):
        np.random.shuffle(combined)
        perm_diff = np.mean(combined[:n]) - np.mean(combined[n:])
        if perm_diff <= observed_diff:
            count += 1
    
    return count / n_permutations

#   ____________________________________________________________________________
#   main                                                                    ####

def main(input_file):
    df = load_embeddings(input_file)
    
    study_signatures = df[df['Signature'] != 'random']
    random_signatures = df[df['Signature'] == 'random']
    
    study_indices = study_signatures.index.tolist()
    random_indices = random_signatures.index.tolist()
    
    all_embeddings = df.iloc[:, 2:].values
    distance_matrix = compute_pairwise_distances(all_embeddings)
    
    within_study_distances = get_within_study_distances(distance_matrix, study_indices)
    study_to_random_distances = get_study_to_random_distances(distance_matrix, study_indices, random_indices)
    
    effect_size = calculate_cohens_d(within_study_distances, study_to_random_distances[:len(within_study_distances)])
    print(f"Effect size (Cohen's d): {effect_size}")
    
    perm_p_value = permutation_test(within_study_distances, study_to_random_distances)
    print(f"Permutation test p-value: {perm_p_value}")

if __name__ == "__main__":
    input_file = "./processed_data/embeddings.csv"
    main(input_file)