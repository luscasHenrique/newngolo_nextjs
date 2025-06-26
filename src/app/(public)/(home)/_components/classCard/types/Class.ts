// src/app/(public)/_types/Class.ts
// Crie esta pasta e arquivo se não existirem

export interface ClassSchedule {
  day: string; // Ex: "Terça-feira", "Quinta-feira"
  time: string; // Ex: "19:30HS"
}

export interface TeachingUnit {
  name: string;
  address: string;
  schedule: ClassSchedule[];
}

export interface Professor {
  id: string;
  name: string;
  phone: string;
  imageUrl?: string;
}

export interface ClassInfo {
  id: string;
  professor: Professor;
  unit: TeachingUnit;
  // Outros campos se houver, como 'level', 'modality' etc.
}
