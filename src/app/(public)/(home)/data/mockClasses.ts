// src/app/(public)/(home)/data/mockClasses.ts

import { ClassInfo } from "../_components/classCard/types/Class";

// Importa os tipos da pasta do componente ClassCard

export const mockClasses: ClassInfo[] = [
  {
    id: "class1",
    professor: {
      id: "prof1",
      name: "ANDERSON PEREIRA GOMES DE SOUZA",
      phone: "(61) 99999-9999",
      imageUrl: "/images/professors/anderson.jpg", // Coloque uma imagem em public/images/professors/
    },
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
    professor: {
      id: "prof2",
      name: "MARIA SILVA LOPES",
      phone: "(61) 88888-8888",
      imageUrl: "/images/professors/maria.jpg",
    },
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
    professor: {
      id: "prof3",
      name: "JOÃO CARLOS OLIVEIRA",
      phone: "(61) 77777-7777",
      // imageUrl: '/images/professors/joao.jpg', // Professor sem imagem
    },
    unit: {
      name: "NÚCLEO BANDEIRANTE",
      address: "Rua do Comércio, Quadra 1",
      schedule: [{ day: "Sexta-feira", time: "18:00HS" }],
    },
  },
  // Adicione mais classes se desejar
];
