// lib/mocks.ts

import { Product } from "./types"; // Verifique se o caminho para seu arquivo de tipos está correto

export const productsMock: Product[] = [
  {
    id: "prod_001",
    slug: "smartwatch-pro-x",
    name: "Smartwatch Pro X",
    description: "Relógio inteligente com GPS e monitoramento cardíaco.",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    price: "R$ 799,90",
    originalPrice: "R$ 899,90",
    rating: 5,
    tagText: "11% OFF",
    tagType: "oferta",
  },
  {
    id: "prod_002",
    slug: "camera-dslr-eos",
    name: "Câmera DSLR EOS",
    description: "Fotos profissionais com sensor de 24MP.",
    imageUrl:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=1964&auto=format&fit=crop",
    price: "R$ 3.499,00",
    rating: 4,
    tagText: "Frete Grátis",
    tagType: "frete",
  },
  {
    id: "prod_003",
    slug: "tenis-de-corrida-runner",
    name: "Tênis de Corrida Runner",
    description: "Leveza e amortecimento para sua máxima performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop",
    price: "R$ 450,50",
    rating: 4,
    tagText: "Lançamento",
    tagType: "novidade",
  },
  {
    id: "prod_004",
    slug: "mochila-executiva-impermeavel",
    name: "Mochila Executiva",
    description: "Compartimento para notebook e design à prova d'água.",
    imageUrl:
      "https://images.unsplash.com/photo-1587547131150-f6c56437198a?q=80&w=1887&auto=format&fit=crop",
    price: "R$ 249,99",
    tagText: "",
  },
  {
    id: "prod_005",
    slug: "fone-de-ouvido-noise-cancelling",
    name: "Fone de Ouvido Noise-Cancelling",
    description: "Imersão total no som, sem distrações do mundo exterior.",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    price: "R$ 629,90",
    originalPrice: "R$ 749,90",
    rating: 5,
    tagText: "Oferta",
    tagType: "oferta",
  },
  {
    id: "prod_006",
    slug: "cafeteira-expressa-automatica",
    name: "Cafeteira Expressa Automática",
    description: "Seu café perfeito ao toque de um botão.",
    imageUrl:
      "https://images.unsplash.com/photo-1565452344012-75e1a39ce6ca?q=80&w=1887&auto=format&fit=crop",
    price: "R$ 1.199,00",
    rating: 4,
    tagText: "Frete Grátis",
    tagType: "frete",
  },
  {
    id: "prod_007",
    slug: "teclado-mecanico-gamer-rgb",
    name: "Teclado Mecânico Gamer RGB",
    description: "Precisão e velocidade para suas vitórias nos jogos online.",
    imageUrl:
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa122?q=80&w=1887&auto=format&fit=crop",
    price: "R$ 380,00",
    rating: 5,
    tagText: "",
  },
  {
    id: "prod_008",
    slug: "drone-explorer-4k",
    name: "Drone Explorer 4K",
    description: "Capture imagens aéreas incríveis com estabilidade.",
    imageUrl:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1887&auto=format&fit=crop",
    price: "R$ 2.850,00",
    rating: 4,
    tagText: "Novidade",
    tagType: "novidade",
  },
  {
    id: "prod_009",
    slug: "cadeira-de-escritorio-ergonomica",
    name: "Cadeira de Escritório Ergonômica",
    description: "Conforto e postura correta para longas horas de trabalho.",
    imageUrl:
      "https://images.unsplash.com/photo-1580480055273-228ff53825b3?q=80&w=1887&auto=format&fit=crop",
    price: "R$ 950,00",
    rating: 5,
    tagText: "Frete Grátis",
    tagType: "frete",
  },
  {
    id: "prod_010",
    slug: "oculos-de-sol-polarizado-uv400",
    name: "Óculos de Sol Polarizado UV400",
    description: "Estilo e proteção máxima para os seus olhos.",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
    price: "R$ 189,90",
    originalPrice: "R$ 250,00",
    tagText: "25% OFF",
    tagType: "oferta",
    // Sem rating para testar
  },
];
