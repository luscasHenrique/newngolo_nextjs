// src/app/(public)/professors/_hooks/useProfessorFilter.ts
"use client";

import { useState, useMemo } from "react";
import { Professor } from "../types/Professor";

export interface ProfessorFilterState {
  searchTerm: string;
}

export const useProfessorFilter = (initialProfessors: Professor[]) => {
  const [filters, setFilters] = useState<ProfessorFilterState>({
    searchTerm: "",
  });

  const filteredProfessors = useMemo(() => {
    let tempProfessors = initialProfessors;
    const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();

    if (lowerCaseSearchTerm) {
      tempProfessors = tempProfessors.filter(
        (professor) =>
          professor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          professor.bioShort.toLowerCase().includes(lowerCaseSearchTerm) ||
          professor.corda.toLowerCase().includes(lowerCaseSearchTerm) ||
          professor.categoria.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    tempProfessors.sort((a, b) => a.name.localeCompare(b.name));

    return tempProfessors;
  }, [initialProfessors, filters]);

  return {
    filters,
    setFilters,
    filteredProfessors,
  };
};
