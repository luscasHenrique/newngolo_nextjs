// src/app/(public)/professors/types/Class.ts

import { Professor } from "@/app/(public)/professors/types/Professor";

export interface ClassSchedule {
  day: string; // Ex: "Terça-feira", "Quinta-feira"
  time: string; // Ex: "19:30HS"
}

export interface TeachingUnit {
  name: string;
  address: string;
  schedule: ClassSchedule[];
}

export interface ClassInfo {
  id: string; // ID da aula específica/unidade de ensino
  professor: Professor; // Agora usa o tipo Professor unificado
  unit: TeachingUnit;
  // Outros campos se houver
}
