// src/app/(public)/professors/page.tsx
"use client";

import { useState, useCallback } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import ProfessorProfileCard from "./_components/ProfessorProfileCard";
import { useProfessorFilter } from "./_hooks/useProfessorFilter";
import ProfessorFilter from "./_components/ProfessorFilter";
// CORREÇÃO AQUI: Importar 'allProfessors' do seu arquivo de dados
import { allProfessors } from "./data/mockProfessors";
import type { Professor } from "./types/Professor";

// A função getProfessorsData agora usa 'allProfessors'
async function getProfessorsData(): Promise<Professor[]> {
  return Promise.resolve(allProfessors);
}

export default function ProfessorsPage() {
  // Inicializa com os dados buscados
  const initialProfessors: Professor[] = allProfessors;

  const { filters, setFilters, filteredProfessors } =
    useProfessorFilter(initialProfessors);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    },
    [setFilters]
  );

  const sectionTitle = "Nossos Mestres e Professores";
  const sectionDescription =
    "Conheça a equipe de capoeira do N'golo, sua graduação e experiência.";

  return (
    // CORREÇÃO AQUI: Adiciona um contêiner principal para o layout da página
    <>
      {/* Hero Section */}
      <section className="text-center ">
        <SectionTitle title={sectionTitle} animate={true} />
        <p className="text-xl font-light max-w-3xl mx-auto mt-4">
          {sectionDescription}
        </p>
      </section>

      {/* Filtro de Pesquisa */}
      <ProfessorFilter
        searchTerm={filters.searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Grade de Cards de Professores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredProfessors.length === 0 ? (
          <p className="col-span-full text-center text-gray-700 text-lg py-10">
            Nenhum professor encontrado com os critérios de pesquisa.
          </p>
        ) : (
          filteredProfessors.map((professor) => (
            <ProfessorProfileCard key={professor.id} professor={professor} />
          ))
        )}
      </div>
    </>
  );
}
