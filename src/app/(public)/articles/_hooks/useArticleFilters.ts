// src/app/articles/_hooks/useArticleFilters.ts
"use client";

import { useState, useMemo } from "react";
import type { Article, ArticleFiltersState } from "../_types/Article"; // Ajustado o caminho

export const useArticleFilters = (articles: Article[]) => {
  const [filters, setFilters] = useState<ArticleFiltersState>({
    searchTerm: "",
    category: "all",
  });

  const filteredArticles = useMemo(() => {
    let tempFiltered = articles;

    if (filters.category !== "all") {
      tempFiltered = tempFiltered.filter(
        (article) => article.category === filters.category
      );
    }

    if (filters.searchTerm) {
      const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
      tempFiltered = tempFiltered.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          article.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          (article.author &&
            article.author.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    return tempFiltered;
  }, [articles, filters]);

  return {
    filters,
    setFilters,
    filteredArticles,
  };
};
