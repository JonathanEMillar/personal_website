# PHIND RNA-seq
# -- tximport to DESeq2
################################################################################
# Author: JE Millar
# Date 2024-04-05
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
library(tximport) # 1.28.0

#   ____________________________________________________________________________
#   tximport                                                                ####

samples <- read.table(file.path("./raw_data/samples.txt"), header = TRUE)

files <- file.path(samples$samples, "_quant.sf", fsep = "")

tx2gene <- read.table(file.path("./raw_data/tx2gene.txt"), header = TRUE)

names(files) <- paste0("GCTU_PN", stringr::str_pad(1:100, width = 4, pad = "0"))

txi.salmon <- txiimport::tximport(files,
  type = "salmon",
  tx2gene = tx2gene,
  countsFromAbundance = "lengthScaledTPM"
)

head(txi.salmon$counts)

#   ____________________________________________________________________________
#   add metadata                                                            ####

metadata <- readr::read_csv("./raw_data/metadata.csv") |>
  dplyr::relocate(Sample_ID) |>
  dplyr::arrange(Sample_ID) |>
  tibble::column_to_rownames(var = "Sample_ID")

#   ____________________________________________________________________________
#   create DESeq2 dataset                                                   ####

dds <- DESeq2::DESeqDataSetFromTximport(txi.salmon,
  colData = metadata,
  design = ~subphenotype
)

#   ____________________________________________________________________________
#   obtain normalised counts                                                ####

dds <- BiocGenerics::estimateSizeFactors(dds)

normalised_counts <- BiocGenerics::counts(dds, normalized = TRUE)

readr::write_rds(dds, "./processed_data/dds.rds")
write.table(normalised_counts, file = "./processed_data/normalized_counts.txt", sep = "\t", quote = F, col.names = NA)

