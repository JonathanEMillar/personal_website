# PHIND RNA-seq
# -- Protein-protein interaction
################################################################################
# Author: JE Millar
# Date 2024-04-23
# Version: 1.0
# R Version: 4.3.1
# en: GB UTF-8
################################################################################

#   ____________________________________________________________________________
#   set seed                                                                ####

set.seed(1984)

#   ____________________________________________________________________________
#   load libraries                                                          ####

library(dplyr) # 1.1.4
library(readr) # 2.1.5
library(STRINGdb) # 2.14.3

#   ____________________________________________________________________________
#   load STRING db                                                          ####

string_db <- STRINGdb::STRINGdb$new(version="12.0",
    species = 9606,
    score_threshold = 400,
    network_type = "full"
)

#   ____________________________________________________________________________
#   load DE results                                                         ####

res <- readRDS("PHIND_de_results.rds")

#   ____________________________________________________________________________
#   map genes                                                               ####

# filter significant DE genes

res_filtered <- res |>
  tibble::as_tibble() |>
  dplyr::filter(padj < 0.1 & (log2FoldChange > 1.2 | log2FoldChange < -1.2)) |>
  dplyr::mutate(gene = dplyr::coalesce(symbol, ensembl)) |>
  dplyr::select(c(gene, log2FoldChange, padj)) |>
  dplyr::arrange(padj) |>
  base::as.data.frame()

mapped <- string_db$map(res_filtered, "gene", removeUnmappedRows = TRUE)

#   ____________________________________________________________________________
#   plot network                                                            ####

string_db$plot_network(mapped)

#   ____________________________________________________________________________
#   plot clusters                                                           ####

clustersList <- string_db$get_clusters(mapped$STRING_id)

par(mfrow=c(3,2))
for(i in seq(1:6)){
  string_db$plot_network(clustersList[[i]])
}

