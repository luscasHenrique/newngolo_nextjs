// src/app/articles/_components/ArticleListDisplay.tsx
"use client"; // Este é um Client Component pois usa hooks de estado

import { useCallback } from "react";
import ArticleCard from "./ArticleCard";
import ArticleFilters from "./ArticleFilters"; // Importa o componente de UI do filtro
import { useArticleFilters } from "../_hooks/useArticleFilters"; // Importa o hook de lógica
import type { Article } from "../_types/Article"; // Importa o tipo

interface ArticleListDisplayProps {
  initialArticles: Article[]; // Artigos iniciais vindos do Server Component
  availableCategories: string[]; // Categorias disponíveis
}

const ArticleListDisplay: React.FC<ArticleListDisplayProps> = ({
  initialArticles,
  availableCategories,
}) => {
  // Lógica de filtragem vem do hook personalizado
  const { filters, setFilters, filteredArticles } =
    useArticleFilters(initialArticles);

  // Callbacks otimizados com useCallback para passar para ArticleFilters
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    },
    [setFilters]
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({ ...prev, category: e.target.value }));
    },
    [setFilters]
  );

  return (
    <>
      <ArticleFilters
        searchTerm={filters.searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        availableCategories={availableCategories} // Passa as categorias para o componente de filtro UI
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
