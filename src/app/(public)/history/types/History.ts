// src/app/history/_types/History.ts

export interface HistoryMilestone {
  id: string;
  year: number;
  title: string;
  description: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  category?: "Fundação" | "Projeto" | "Grupo" | "Significado" | "Outro";
}
