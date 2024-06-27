# PHIND RNA-seq
# -- Functional enrichment
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

library(dplyr) # 1.1.4
library(forcats) # 1.0.0
library(ggplot2) # 3.5.0
library(ggsci) # 3.0.3
library(gprofiler2) # 0.2.1
library(stringr) # 1.5.1
library(tibble) # 3.2.1

#   ____________________________________________________________________________
#   load DE results                                                         ####

res <- readRDS("PHIND_de_results.rds")

#   ____________________________________________________________________________
#   filter DE genes                                                         ####

res_tidy <- res |>
  tibble::as_tibble()

up <- res_tidy |>
  dplyr::filter(padj < 0.1 & log2FoldChange > 1.2) |>
  dplyr::arrange(padj)

up_genes <- dplyr::coalesce(up$symbol, up$ensembl)

down <- res_tidy |>
  dplyr::filter(padj < 0.1 & log2FoldChange < -1.2) |>
  dplyr::arrange(padj)

down_genes <- dplyr::coalesce(down$symbol, down$ensembl)

bg <- dplyr::coalesce(res_tidy$symbol, res_tidy$ensembl)

#   ____________________________________________________________________________
#   enrichment                                                              ####

# g:profiler enrichment

enrich_gprofiler <- function(query_genes, background) {
  gprofiler2::gost(
    query = query_genes,
    organism = "hsapiens",
    ordered_query = TRUE,
    multi_query = FALSE,
    significant = TRUE,
    exclude_iea = TRUE,
    measure_underrepresentation = FALSE,
    evcodes = FALSE,
    user_threshold = 0.1,
    correction_method = "g_SCS",
    custom_bg = background,
    numeric_ns = "",
    sources = c("GO", "KEGG", "REAC", "WP", "HPA"),
    as_short_link = FALSE
  )
}

# tabulate enrichment results

enrich_tabulate <- function(results){
  results |>
    dplyr::select(c(source, term_id, term_name, p_value, term_size, intersection_size, precision, recall)) |>
    tibble::rownames_to_column("Rank") |>
    dplyr::mutate(term_name = stringr::str_to_sentence(term_name)) |>
    dplyr::mutate(source = forcats::as_factor(source)) |>
    dplyr::mutate(p_value = formatC(p_value, format = "e", digits = 2)) |>
    dplyr::arrange(p_value)
}

# plot enrichment results

pathway_select <- function(data, pathway) {
  d <- data |>
    dplyr::filter(source == pathway)
  return(d)
}

pathway_order <- function(data) {
  d <- data |>
    dplyr::mutate(term_name = forcats::as_factor(term_name)) |>
    dplyr::mutate(term_name = forcats::fct_reorder(term_name, p_value))
  return(d)
}

pathway_bubble <- function(data){
  p <- ggplot2::ggplot(data, ggplot2::aes(x = term_name, y = p_value, size = recall)) +
    ggplot2::geom_point(alpha = 0.5) +
    ggplot2::scale_size(range = c(.1, 8)) +
    ggplot2::coord_flip() +
    ggplot2::theme_bw() +
    ggplot2::labs(x = "", y = "P value") +
    ggsci::scale_color_npg()
  return(p)
}
