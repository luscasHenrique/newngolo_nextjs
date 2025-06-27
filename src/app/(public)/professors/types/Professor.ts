// src/app/(public)/types/Professor.ts

import { GradeCategory } from "../../graduation/types/Graduation";

// Reusar GradeCategory da página de graduação

export interface Professor {
  id: string;
  name: string;
  imageUrl?: string;
  phone: string; // Adicionado de volta do tipo Professor original
  bioShort: string;
  corda: string; // Ex: "Roxa", "Vermelha", "Branca"
  categoria: GradeCategory; // Ex: "MESTRE", "CONTRAMESTRE", etc.
  avaliacao: number; // Nota de avaliação (0-10)
  totalReviews?: number; // Opcional: número total de avaliações

  // Você pode adicionar mais campos de currículo aqui, se necessário para a página de detalhes
  // bioLong?: string;
  // specializations?: string[];
  // experienceYears?: number;
}
