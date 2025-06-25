// /src/app/(public)/articles/_components/ArticleFilters.tsx
import React, { useState } from "react";

interface ArticleFiltersProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  onSearch,
  onCategoryChange,
  categories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      <input
        type="text"
        placeholder="Pesquisar artigos..."
        className="p-2 border rounded w-full sm:w-1/2"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="p-2 border rounded w-full sm:w-auto"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="all">Todas as Categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArticleFilters;
