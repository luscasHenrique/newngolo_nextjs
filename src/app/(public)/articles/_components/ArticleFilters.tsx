// src/app/articles/_components/ArticleFilters.tsx
// Este é um componente de UI puro, pode ser um Server Component ou Client Component.
// Para lidar com onChange, ele precisa ser um Client Component ou receber callbacks.
// Vamos fazer ele receber os valores e callbacks como props.

// Não precisa de "use client" se as funções handleSearchChange e handleCategoryChange
// forem passadas como props do ArticleListDisplay.tsx, que é Client Component.
// Assim, ele se torna um "dumb component".

interface ArticleFiltersProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableCategories: string[];
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
}) => {
  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner flex flex-col md:flex-row items-center justify-between gap-4">
      <input
        type="text"
        placeholder="Pesquisar por título, descrição ou autor..."
        className="p-3 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <select
        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        value={selectedCategory}
        onChange={onCategoryChange}
      >
        <option value="all">Todas as Categorias</option>
        {availableCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArticleFilters;
