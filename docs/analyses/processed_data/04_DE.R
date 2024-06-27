# PHIND RNA-seq
# -- DE
################################################################################
# Author: JE Millar
# Date 2024-04-22
# Version: 1.0
# R Version: 4.3.1
# en: GB UTF-8
################################################################################

#   ____________________________________________________________________________
#   set seed                                                                ####

set.seed(1984)

#   ____________________________________________________________________________
#   load libraries                                                          ####

library(AnnotationDbi) # 1.62.1
library(ashr) # 2.2-63
library(DESeq2) # 1.40.2
library(dplyr) # 1.1.4
library(EnhancedVolcano) # 1.18.0
library(org.Hs.eg.db) # 3.17.0
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
#   run DESeq2                                                              ####

de_subphenotypes <- DESeq2::DESeq(dds)

res <- DESeq2::results(de_subphenotypes,
  contrast = c("subphenotype","hyperinflammatory","hypoinflammatory")
)

#   ____________________________________________________________________________
#   DE analysis                                                             ####

# MA plot without and with lfc shrinkage

res_lfcs <- DESeq2::lfcShrink(de_subphenotypes,
    coef = 2,
    contrast = c("subphenotype","hyperinflammatory","hypoinflammatory"),
    type = "ashr"
)

DESeq2::plotMA(res, ylim = c(-2, 2))
DESeq2::plotMA(res_lfcs, ylim = c(-2, 2))

# annotate samples

ens.str <- substr(rownames(res), 1, 15)

res$symbol <- mapIds(org.Hs.eg.db,
  keys = ens.str,
  column = "SYMBOL",
  keytype = "ENSEMBL",
  multiVals = "first"
)

res$entrez <- mapIds(org.Hs.eg.db,
  keys = ens.str,
  column = "ENTREZID",
  keytype = "ENSEMBL",
  multiVals = "first"
)

# summary

DESeq2::summary(res)

# number significantly DE genes

sum(res$padj < 0.1, na.rm = TRUE)

res_sig <- subset(res, padj < 0.1)

# number significantly downregulated DE genes

sum(res$log2FoldChange < -2, na.rm = TRUE)

# number significantly upregulated DE genes

sum(res$log2FoldChange > 2, na.rm = TRUE)

# tidy results

res$ensembl <- rownames(res)

rownames(res) <- ifelse(is.na(res$symbol) | duplicated(res$symbol) | duplicated(res$symbol, fromLast = TRUE),
  res$ensembl,
  res$symbol
)

res_tidy <- res |>
  tibble::as_tibble()

# volcano plots

up <- res_tidy |>
  dplyr::filter(padj < 0.1 & log2FoldChange > 1.2) |>
  dplyr::arrange(padj)

up_genes <- dplyr::coalesce(up$symbol, up$ensembl)

down <- res_tidy |>
  dplyr::filter(padj < 0.1 & log2FoldChange < -1.2) |>
  dplyr::arrange(padj)

down_genes <- dplyr::coalesce(down$symbol, down$ensembl)

EnhancedVolcano::EnhancedVolcano(res,
  lab = rownames(res),
  x = "log2FoldChange",
  y = "pvalue",
  title = "Hyper vs. hypo-inflammatory ARDS",
  ylim = c(0, max(-log10(res$padj), na.rm = TRUE) + 5),
  xlim = c(min(res$log2FoldChange, na.rm = TRUE) - 1, max(res$log2FoldChange, na.rm = TRUE) + 1),
  pCutoff = 1e-2,
  FCcutoff = 1.2,
  pointSize = 2.0,
  selectLab = up_genes,
  labCol = "black",
  labFace = "bold",
  boxedLabels = TRUE,
  colAlpha = 4 / 5,
  labSize = 4.0,
  legendPosition = "right",
  legendLabSize = 14,
  legendIconSize = 5.0,
  drawConnectors = TRUE,
  widthConnectors = 0.2,
  max.overlaps = 50,
  arrowheads = FALSE,
  colConnectors = "black"
)

#   ____________________________________________________________________________
#   Write out                                                               ####

saveRDS(res, "PHIND_de_results.rds")