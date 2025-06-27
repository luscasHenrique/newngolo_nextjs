// src/app/(public)/(home)/_hooks/useClassesData.ts
"use client";

import { useState, useEffect } from "react";
import type { ClassInfo } from "../../professors/types/Class"; // Caminho e tipo corrigidos

// Importa os dados unificados
import { allClasses } from "../../professors/data/mockProfessors"; // <-- CAMINHO E NOME AJUSTADOS

export const useClassesData = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Usando os dados unificados (allClasses) diretamente
        const data: ClassInfo[] = allClasses; // <-- USANDO allCLASSES AQUI

        setClasses(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []); // O array vazio garante que o efeito só rode uma vez na montagem

  return { classes, loading, error };
};
