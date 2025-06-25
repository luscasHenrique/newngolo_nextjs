// src/app/articles/_components/ArticleListDisplay.tsx
"use client";

import { useCallback } from "react";
import ArticleCard from "./ArticleCard";
import ArticleFilters from "./ArticleFilters";
import { useArticleFilters } from "../_hooks/useArticleFilters";
import type { Article } from "../_types/Article";

interface ArticleListDisplayProps {
  initialArticles: Article[];
  availableCategories: string[];
}

const ArticleListDisplay: React.FC<ArticleListDisplayProps> = ({
  initialArticles,
  availableCategories,
}) => {
  const { filters, setFilters, filteredArticles } =
    useArticleFilters(initialArticles);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    },
    [setFilters]
  );

  // AJUSTE AQUI: onCategoryChange agora recebe 'value: string' diretamente
  const handleCategoryChange = useCallback(
    (value: string) => {
      setFilters((prev) => ({ ...prev, category: value }));
    },
    [setFilters]
  );

  return (
    <>
      <ArticleFilters
        searchTerm={filters.searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange} // Passa a função ajustada
        availableCategories={availableCategories}
      />

      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-700 text-lg py-10">
          Nenhum artigo encontrado com os filtros selecionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </>
  );
};

export default ArticleListDisplay;
