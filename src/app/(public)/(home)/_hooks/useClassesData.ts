// src/app/(public)/(home)/_hooks/useClassesData.ts
"use client";

import { useState, useEffect } from "react";
import { ClassInfo } from "../_components/classCard/types/Class";
import { mockClasses } from "../data/mockClasses";
// Importa o tipo ClassInfo da pasta do ClassCard

export const useClassesData = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simula uma chamada de API assíncrona
        // Em um cenário real, você faria um fetch:
        // const response = await fetch('/api/classes');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch classes');
        // }
        // const data: ClassInfo[] = await response.json();

        // Usando os dados mockados diretamente
        const data: ClassInfo[] = mockClasses;

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
