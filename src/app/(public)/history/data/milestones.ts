// src/app/history/_data/milestones.ts

import type { HistoryMilestone } from "../types/History";

export const historyMilestones: HistoryMilestone[] = [
  {
    id: "m1",
    year: 1987,
    title: "Início do CAC no Centro Educacional 02",
    description:
      "Mestre Dionízio inicia um trabalho com capoeira na escola, denominado CAC (Centro de Aprendizagem de Capoeira), vinculado à Secretaria de Estado de Educação do DF (FEDF).",
    date: "1987-11",
    category: "Fundação",
    imageUrl: "/images/cantoRaiz.jpeg",
  },
  {
    id: "m2",
    year: 1992,
    title: "CAC Incorporado ao Programa CID",
    description:
      "O projeto é incorporado ao programa dos CIDs (Centro de Iniciação Desportiva), passando a ser denominado Centro de Iniciação Desportiva em Capoeira.",
    category: "Projeto",
  },
  {
    id: "m3",
    year: 2003,
    title: "Desvinculação do Grupo Beribazu",
    description: "O trabalho se desvincula do Grupo de Capoeira Beribazu.",
    date: "2003-10-13",
    category: "Grupo",
  },
  {
    id: "m4",
    year: 2004,
    title: "Registro do Centro Cultural Arte Luta N'golo Capoeira",
    description:
      "O Centro Cultural Arte Luta N'golo Capoeira é registrado como Entidade sem fins Lucrativos e personalidade jurídica.",
    date: "2004-02-07",
    category: "Grupo",
  },
  {
    id: "m5",
    year: 2004,
    title: "Escolha do Nome N'golo",
    description:
      "Após discussões com os alunos, o nome N'golo é escolhido para o grupo, refletindo a proposta de difundir a capoeira como cultura nacional e a vertente arte luta.",
    date: "2004-07-10",
    category: "Grupo",
  },
  {
    id: "m6",
    year: 2004,
    title: "Significado do Nome N'golo",
    description:
      'N\'golo era um ritual de disputa entre jovens guerreiros na África, e também significa "força" ou "poder" em Kikongo. Além disso, a dança da zebra é um dos elementos motrizes africanos formadores da capoeira.',
    category: "Significado",
  },
];
