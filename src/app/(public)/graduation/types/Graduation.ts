// src/app/(public)/graduation/types/Graduation.ts

export type GradeCategory =
  | "ALUNO"
  | "MONITOR"
  | "CONTRAMESTRE"
  | "MESTRE EDIFICADOR"
  | "MESTRE DIGNIFICADOR"
  | "FILIADO"
  | "RECICLAGEM"
  | "ESPECIAL";

export interface OrixaInfo {
  name: string;
  domain: string;
  representativeColor: string;
}

export interface MainGrade {
  id: string;
  cordColor: string;
  category: GradeCategory;
  phaseSocialNegro: string;
  orixa: OrixaInfo;
  metaPhysicalRelation: string;
  headerColorClass: string; // Classe Tailwind para a cor de fundo do CABEÇALHO da seção (ex: "bg-blue-600")
}

// NOVO TIPO para a estrutura da tabela de hierarquia
export interface HierarchyTableRow {
  id: string;
  systemGrade: string; // Coluna "Sistema de Graduação"
  traditional: string; // Coluna "Tradicional"
  age2_5Years: string; // Coluna "02 a 05 anos"
  age6_12Years: string; // Coluna "06 a 12 anos"
  special: string; // Coluna "Especial"
}

export interface SpecialGrade {
  id: string;
  title: string;
  ageRange?: string;
  description: string;
  category?: GradeCategory; // Para categorização dos adendos
}

export interface KnotInfo {
  description: string; // "O nó da corda deve ser feito..."
  genderRuleMale: string; // "Se for do sexo masculino..."
  genderRuleFemale: string; // "e se for do sexo feminino..."
}
