// src/app/(public)/professors/_components/ProfessorFilter.tsx
"use client";

import React, { useCallback } from "react";
import { Input } from "@/components/ui/input"; // <-- ESTE É O INPUT DO SHADCN/UI

interface ProfessorFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessorFilter: React.FC<ProfessorFilterProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Input // <-- Componente Input do shadcn/ui sendo usado aqui
      type="text"
      placeholder="Pesquisar por professor..."
      className="w-full max-w-md p-3 border border-gray-300 rounded-lg transition duration-200"
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
};

export default ProfessorFilter;
