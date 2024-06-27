# PHIND RNA-seq
# -- Overlap with subphenotypic studies
################################################################################
# Author: JE Millar
# Date 2024-05-02
# Version: 1.0
# R Version: 4.4.0
# en: GB UTF-8
################################################################################

#   ____________________________________________________________________________
#   set seed                                                                ####

set.seed(1984)

#   ____________________________________________________________________________
#   load libraries                                                          ####

library(biomaRt) # 2.60.0
library(dplyr) # 1.1.4
library(eulerr) # 7.0.0
library(readr) # 2.1.5

#   ____________________________________________________________________________
#   load data                                                               ####

phind <- readr::read_csv("phind_results.csv")

sarma_rnaseq <- readr::read_csv("sarma_rnaseq_pruned.csv")

sinha_d0 <- readr::read_csv("sinha_d0.csv")

sinha_d2 <- readr::read_csv("sinha_d2.csv")

#   ____________________________________________________________________________
#   reduce data to sig DEGs                                                 ####

## filter phind for significant DEGs

phind_degs <- phind |>
  dplyr::filter(padj < 0.1 & (log2FoldChange > 1.2 | log2FoldChange < -1.2)) |>
  dplyr::select(c(symbol, ensembl, padj, log2FoldChange)) |>
  dplyr::rename(gene = "symbol") |>
  dplyr::pull(ensembl)

sarma_rnaseq_degs <- sarma_rnaseq |>
  dplyr::pull(ensembl)

sinha_d0_degs <- sinha_d0 |>
  dplyr::filter(adj.P.Val < 0.1 & (logFC > 1.2 | logFC < -1.2)) |>
  dplyr::select(c(...1, gene_name)) |>
  dplyr::rename(gene = "gene_name") |>
  dplyr::rename(ensembl = "...1") |>
  dplyr::pull(ensembl)

sinha_d2_degs <- sinha_d2 |>
  dplyr::filter(adj.P.Val < 0.1 & (logFC > 1.2 | logFC < -1.2)) |>
  dplyr::select(c(...1, gene_name)) |>
  dplyr::rename(gene = "gene_name") |>
  dplyr::rename(ensembl = "...1") |>
  dplyr::pull(ensembl)

#   ____________________________________________________________________________
#   simple overlap                                                          ####


overlap_euler <- function(comparator_degs){
  comparison_olp <- list(
    phind = phind_degs,
    comparator = comparator_degs)
  comparison_eu_olp <- eulerr::euler(comparison_olp)
  plot <- plot(comparison_eu_olp, quantities = list(type = "counts"))
  return(plot)
}


