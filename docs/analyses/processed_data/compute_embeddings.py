# PHIND RNA-seq
# -- Gene embeddings
################################################################################
# Author: JE Millar
# Date: 2024-06-27
# Version: 1.0
# Python: 3.10.12
# en: GB UTF-8
################################################################################

import numpy as np
import csv
from gen_repr_util import gene_sim_mean_std, compute_list_emb

#   ____________________________________________________________________________
#   load embeddings                                                         ####

def load_embeddings(file_path):
    with open(file_path, mode='r') as infile:
        reader = csv.reader(infile)
        return {rows[0]: np.array(rows[1:], dtype=np.float32) for rows in reader}

go_emb = load_embeddings('./processed_data/gene_vec_go_256.csv')
archs4_emb = load_embeddings('./processed_data/gene_vec_archs4_256.csv')

#   ____________________________________________________________________________
#   compute embeddings                                                      ####

def compute_embeddings(gene_list, go_emb, archs4_emb, mean_std_dict_go, mean_std_dict_archs4):
    return compute_list_emb(gene_list, go_emb, archs4_emb, mean_std_dict_go, mean_std_dict_archs4)

#   ____________________________________________________________________________
#   save embeddings                                                         ####

def save_embeddings_to_csv(embeddings, output_file):
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Signature', 'Iteration'] + [f'Dim_{i}' for i in range(len(next(iter(embeddings.values()))[0]))])
        for signature_name, iterations in embeddings.items():
            for i, embedding in enumerate(iterations):
                writer.writerow([signature_name, i] + embedding.tolist())

#   ____________________________________________________________________________
#   main                                                                    ####

def main(input_file, output_file):
    
    mean_std_dict_go, mean_std_dict_archs4 = gene_sim_mean_std(go_emb, archs4_emb)
    
    gene_signatures = {}
    with open(input_file, 'r') as f:
        for line in f:
            parts = line.strip().split(',')
            signature_name = parts[0]
            gene_list = parts[1:]
            
            if signature_name not in gene_signatures:
                gene_signatures[signature_name] = []
            gene_signatures[signature_name].append(gene_list)

    embeddings = {}
    for signature_name, iterations in gene_signatures.items():
        embeddings[signature_name] = []
        for gene_list in iterations:
            embedding = compute_embeddings(gene_list, go_emb, archs4_emb, mean_std_dict_go, mean_std_dict_archs4)
            embeddings[signature_name].append(embedding)
    
    save_embeddings_to_csv(embeddings, output_file)
    print(f"Embeddings for all signatures and iterations have been saved to {output_file}")

if __name__ == "__main__":
    input_file = "./processed_data/random_iterations.txt"  
    output_file = "./processed_data/embeddings.csv"  
    main(input_file, output_file)