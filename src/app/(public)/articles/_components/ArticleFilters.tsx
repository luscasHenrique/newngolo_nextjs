// src/app/articles/_components/ArticleFilters.tsx
// Este componente ainda é de UI puro.
// Como ele usa componentes do shadcn/ui que podem ter lógica interna ou depender de Client Components,
// é uma boa prática marcá-lo com "use client" se estiver em dúvida,
// ou se observar que os componentes do shadcn/ui que ele importa já são Client Components.
// Neste caso, Input e Select do shadcn/ui geralmente são Client Components.
"use client";

import { Input } from "@/components/ui/input"; // Ajuste o caminho conforme sua configuração do shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Ajuste o caminho

interface ArticleFiltersProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Evento do input
  selectedCategory: string;
  onCategoryChange: (value: string) => void; // Evento do Select do shadcn/ui passa o valor diretamente
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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Componente Input do shadcn/ui */}
      <Input
        type="text"
        placeholder="Pesquisar por título, descrição ou autor..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full md:w-2/3" // Tailwind classes para largura
      />

      {/* Componente Select do shadcn/ui */}
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full md:w-1/3">
          <SelectValue placeholder="Todas as Categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as Categorias</SelectItem>
          {availableCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleFilters;
