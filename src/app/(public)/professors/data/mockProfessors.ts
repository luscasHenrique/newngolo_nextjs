// src/app/(public)/_data/appData.ts

import { GradeCategory } from "../../graduation/types/Graduation";
import { ClassInfo } from "../types/Class";
import { Professor } from "../types/Professor";

export const allProfessors: Professor[] = [
  {
    id: "prof_anderson",
    name: "ANDERSON PEREIRA GOMES DE SOUZA",
    imageUrl: "/images/professors/anderson.jpg",
    phone: "(61) 99999-9999",
    bioShort:
      "Mestre de Capoeira com foco em movimentos tradicionais e filosofia. Mais de 30 anos de experiência.",
    corda: "VERMELHA",
    categoria: "MESTRE EDIFICADOR" as GradeCategory,
    avaliacao: 9.2,
    totalReviews: 120,
  },
  {
    id: "prof_maria",
    name: "MARIA SILVA LOPES",
    imageUrl: "/images/professors/maria.jpg",
    phone: "(61) 88888-8888",
    bioShort:
      "Contramestra apaixonada por capoeira, com foco em musicalidade e desenvolvimento de alunos iniciantes.",
    corda: "ROXA",
    categoria: "CONTRAMESTRE" as GradeCategory,
    avaliacao: 8.8,
    totalReviews: 95,
  },
  {
    id: "prof_joao",
    name: "JOÃO CARLOS OLIVEIRA",
    // imageUrl: '/images/professors/joao.jpg', // Remova esta linha se a imagem não existir
    phone: "(61) 77777-7777",
    bioShort:
      "Monitor experiente, com aulas dinâmicas para crianças e adolescentes. Especialista em Capoeira Regional.",
    corda: "AMARELA",
    categoria: "MONITOR" as GradeCategory,
    avaliacao: 7.9,
    totalReviews: 70,
  },
  {
    id: "prof_ana",
    name: "ANA PAULA FERREIRA",
    imageUrl: "/images/professors/ana.jpg",
    phone: "(61) 66666-6666",
    bioShort:
      "Aluna graduada, focada em técnicas de defesa pessoal e aprimoramento físico através da capoeira.",
    corda: "VERDE",
    categoria: "ALUNO" as GradeCategory,
    avaliacao: 8.5,
    totalReviews: 50,
  },
  {
    id: "prof_carlos",
    name: "CARLOS HENRIQUE VIEIRA",
    imageUrl: "/images/professors/carlos.jpg",
    phone: "(61) 55555-5555",
    bioShort:
      "Mestre Dignificador, um dos pilares do grupo, com profunda sabedoria sobre a história e os fundamentos da capoeira.",
    corda: "BRANCA",
    categoria: "MESTRE DIGNIFICADOR" as GradeCategory,
    avaliacao: 9.8,
    totalReviews: 150,
  },
];

export const allClasses: ClassInfo[] = [
  {
    id: "class1",
    professor: allProfessors.find((p) => p.id === "prof_anderson")!,
    unit: {
      name: "GUARÁ 2",
      address: "4 BATALHÃO PMDF AE 10",
      schedule: [
        { day: "Terça-feira", time: "19:30HS" },
        { day: "Quinta-feira", time: "19:30HS" },
      ],
    },
  },
  {
    id: "class2",
    professor: allProfessors.find((p) => p.id === "prof_maria")!,
    unit: {
      name: "SOBRADINHO 1",
      address: "Quadra Central, Lote 5",
      schedule: [
        { day: "Segunda-feira", time: "20:00HS" },
        { day: "Quarta-feira", time: "20:00HS" },
      ],
    },
  },
  {
    id: "class3",
    professor: allProfessors.find((p) => p.id === "prof_joao")!,
    unit: {
      name: "NÚCLEO BANDEIRANTE",
      address: "Rua do Comércio, Quadra 1",
      schedule: [{ day: "Sexta-feira", time: "18:00HS" }],
    },
  },
  // Exemplo de um professor dando aula em duas unidades, mas ainda sendo um único professor no allProfessors
  {
    id: "class4",
    professor: allProfessors.find((p) => p.id === "prof_anderson")!, // Mestre Anderson também dá aula aqui
    unit: {
      name: "ASA NORTE",
      address: "Colégio X, Quadra Y",
      schedule: [{ day: "Segunda-feira", time: "18:00HS" }],
    },
  },
];
