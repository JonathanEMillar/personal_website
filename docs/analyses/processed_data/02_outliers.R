# PHIND RNA-seq
# -- Outlier detection, filtering, and clustering
################################################################################
# Author: JE Millar
# Date 2024-04-08
# Version: 1.0
# R Version: 4.3.1
# en: GB UTF-8
################################################################################

#   ____________________________________________________________________________
#   set seed                                                                ####

set.seed(1984)

#   ____________________________________________________________________________
#   load libraries                                                          ####

library(BiocGenerics) # 0.48.1
library(DESeq2) # 1.40.2
library(dplyr) # 1.1.4
library(ggplot2) # 3.5.2
library(glmpca) # 0.2.0
library(pheatmap) # 1.0.12
library(PoiClaClu) # 1.0.2.1
library(RColorBrewer) # 1.1-3
library(readr) # 2.1.5

#   ____________________________________________________________________________
#   load dds                                                                ####

dds <- readr::read_rds("clean_dds.rds")

#   ____________________________________________________________________________
#   pre-filtering                                                           ####

# filter by read count

dds <- dds[rowSums(counts(dds)) > 10, ]

# filter U2

genes_to_remove <- c("ENSG00000275616", "ENSG00000274062", "ENSG00000275219", "ENSG00000274862")

genes_to_keep <- which(!rownames(dds) %in% genes_to_remove)

dds <- dds[genes_to_keep, ]

genes_to_remove %in% rownames(dds)

#   ____________________________________________________________________________
#   exploratory analysis                                                    ####

# sample distances using the Poisson distance

poisd <- PoiClaClu::PoissonDistance(t(BiocGenerics::counts(dds)))
samplePoisDistMatrix <- as.matrix(poisd$dd)
rownames(samplePoisDistMatrix) <- paste(dds$dex, dds$cell, sep = " - ")
colnames(samplePoisDistMatrix) <- NULL
pheatmap::pheatmap(samplePoisDistMatrix,
  clustering_distance_rows = poisd$dd,
  clustering_distance_cols = poisd$dd)

# PCA using generalised PCA

gpca <- glmpca::glmpca(BiocGenerics::counts(dds), L=2)
gpca.dat <- gpca$factors
gpca.dat$subphenotype <- dds$subphenotype
ggplot2::ggplot(gpca.dat, ggplot2::aes(x = dim1, y = dim2, color = subphenotype)) +
  ggplot2::geom_point(size = 3) + ggplot2::coord_fixed() + ggplot2::ggtitle("glmpca - Generalized PCA")


