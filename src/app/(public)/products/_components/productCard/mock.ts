// src/app/(public)/_components/productCard/mock.ts
import { Product } from "@/types/product/product"; // <-- AGORA USE A INTERFACE UNIFICADA

export const productsMock: Product[] = [
  {
    id: "prod_001",
    slug: "smartwatch-pro-x",
    name: "Smartwatch Pro X",
    description: "Relógio inteligente com GPS e monitoramento cardíaco.",
    price: 799.9, // <--- AGORA É NUMBER
    originalPrice: 899.9, // <--- AGORA É NUMBER
    rating: 5,
    reviewCount: 215,
    tagText: "11% OFF",
    tagType: "offer", // <--- AGORA É 'offer' (do novo tipo unificado)

    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop", // OK
    imagens: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVsb2dpb3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1495704907664-81f74a7efd9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVsb2dpb3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    grade: [
      {
        id: "color-black",
        name: "Cor",
        color: "Preto",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
        gradeSizes: [
          { id: "size-unica", size: "UNICO", price: { price: 799.9 } },
        ],
      },
    ],
    seller: { city: "São Paulo" },
    dimensions: { height: "10", width: "10", depth: "5", weight: "0.2" },
    review: [],
  },
  {
    id: "prod_002",
    slug: "camera-dslr-eos",
    name: "Câmera DSLR EOS",
    description: "Fotos profissionais com sensor de 24MP.",
    price: 3499.0, // <--- AGORA É NUMBER
    rating: 4,
    reviewCount: 450,
    tagText: "Frete Grátis",
    tagType: "freeShipping", // <--- AGORA É 'freeShipping'
    imageUrl:
      "https://images.unsplash.com/photo-1631652645581-a4bc83d8911b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QyVDMyVBMm1lcmElMjBEU0xSJTIwRU9TfGVufDB8fDB8fHww",
    imagens: [
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QyVDMyVBMm1lcmElMjBEU0xSJTIwRU9TfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1533246860975-b290a87773d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QyVDMyVBMm1lcmElMjBEU0xSJTIwRU9TfGVufDB8fDB8fHww", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "Rio de Janeiro" },
    dimensions: { height: "20", width: "15", depth: "10", weight: "1.5" },
    review: [],
  },
  {
    id: "prod_003",
    slug: "tenis-de-corrida-runner",
    name: "Tênis de Corrida Runner",
    description: "Leveza e amortecimento para sua máxima performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 450.5, // <--- AGORA É NUMBER
    rating: 4,
    reviewCount: 88,
    tagText: "Lançamento",
    tagType: "new", // <--- AGORA É 'new'
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "São Paulo" },
    dimensions: { height: "12", width: "8", depth: "4", weight: "0.5" },
    review: [],
  },
  {
    id: "prod_004",
    slug: "mochila-executiva-impermeavel",
    name: "Mochila Executiva",
    description: "Compartimento para notebook e design à prova d'água.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 249.99, // <--- AGORA É NUMBER
    tagText: "",
    // Sem rating
    imagens: ["mochila_galeria1.jpeg"],
    grade: [],
    seller: { city: "Rio de Janeiro" },
    dimensions: { height: "40", width: "30", depth: "15", weight: "1.0" },
    review: [],
  },
  {
    id: "prod_005",
    slug: "fone-de-ouvido-noise-cancelling",
    name: "Fone de Ouvido Noise-Cancelling",
    description: "Imersão total no som, sem distrações do mundo exterior.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 629.9, // <--- AGORA É NUMBER
    originalPrice: 749.9, // <--- AGORA É NUMBER
    rating: 5,
    reviewCount: 520,
    tagText: "Oferta",
    tagType: "offer", // <--- AGORA É 'offer'
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "São Paulo" },
    dimensions: { height: "25", width: "20", depth: "10", weight: "0.3" },
    review: [],
  },
  {
    id: "prod_006",
    slug: "cafeteira-expressa-automatica",
    name: "Cafeteira Expressa Automática",
    description: "Seu café perfeito ao toque de um botão.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 1199.0, // <--- AGORA É NUMBER
    rating: 4,
    reviewCount: 132,
    tagText: "Frete Grátis",
    tagType: "freeShipping",
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "Rio de Janeiro" },
    dimensions: { height: "30", width: "20", depth: "25", weight: "3.0" },
    review: [],
  },
  {
    id: "prod_007",
    slug: "teclado-mecanico-gamer-rgb",
    name: "Teclado Mecânico Gamer RGB",
    description: "Precisão e velocidade para suas vitórias nos jogos online.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 380.0, // <--- AGORA É NUMBER
    rating: 5,
    reviewCount: 312,
    tagText: "",
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "São Paulo" },
    dimensions: { height: "5", width: "45", depth: "15", weight: "1.0" },
    review: [],
  },
  {
    id: "prod_008",
    slug: "drone-explorer-4k",
    name: "Drone Explorer 4K",
    description: "Capture imagens aéreas incríveis com estabilidade.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 2850.0, // <--- AGORA É NUMBER
    rating: 4,
    reviewCount: 98,
    tagText: "Novidade",
    tagType: "new",
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "Rio de Janeiro" },
    dimensions: { height: "10", width: "30", depth: "30", weight: "0.8" },
    review: [],
  },
  {
    id: "prod_009",
    slug: "cadeira-de-escritorio-ergonomica",
    name: "Cadeira de Escritório Ergonômica",
    description: "Conforto e postura correta para longas horas de trabalho.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 950.0, // <--- AGORA É NUMBER
    rating: 5,
    reviewCount: 741,
    tagText: "Frete Grátis",
    tagType: "freeShipping",
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "São Paulo" },
    dimensions: { height: "120", width: "60", depth: "60", weight: "15.0" },
    review: [],
  },
  {
    id: "prod_010",
    slug: "oculos-de-sol-polarizado-uv400",
    name: "Óculos de Sol Polarizado UV400",
    description: "Estilo e proteção máxima para os seus olhos.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: 189.9, // <--- AGORA É NUMBER
    originalPrice: 250.0, // <--- AGORA É NUMBER
    tagText: "25% OFF",
    tagType: "offer",
    imagens: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-154283137-0130638e8e7a?q=80&w=1964&auto=format&fit=crop", // Outra imagem, URL completa
    ],
    grade: [],
    seller: { city: "Rio de Janeiro" },
    dimensions: { height: "5", width: "15", depth: "5", weight: "0.05" },
    review: [],
  },
];
