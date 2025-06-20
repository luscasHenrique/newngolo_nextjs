// src/types/product/product.ts

import { Grade } from "./grade"; // Importa Grade (definida em src/types/product/grade.ts)

// Definir o tipo de tag do produto (combinação de seu antigo e meu novo)
export type ProductTagType =
  | "oferta"
  | "frete"
  | "novidade"
  | "offer"
  | "new"
  | "freeShipping"
  | "highlight";

export interface Product {
  id: string; // ID do produto (UUID)
  slug: string; // Mantido para URL amigável
  imageUrl: string; // Imagem principal do produto (nome do arquivo, será prefixado)

  tagText?: string; // Ex: "15% OFF", "Frete Grátis", "Lançamento"
  tagType?: ProductTagType; // Tipo da tag, usando o tipo unificado

  name: string;
  description: string;

  rating?: number; // Avaliação média (0-5)
  reviewCount?: number; // Número de avaliações

  // PREÇOS: Serão NUMBER para cálculos, o componente UI fará a formatação para string.
  price: number; // Preço final, como número para cálculos
  originalPrice?: number; // Preço original, como número para cálculos (opcional)

  // Propriedades adicionais que vêm da API para o ProductScreen (detalhes)
  imagens: string[]; // Array de nomes de arquivo para o slider
  grade: Grade[]; // Array de grades (cores/tamanhos)
  seller: { city: string /* ...outras props do vendedor */ };
  dimensions: { height: string; width: string; depth: string; weight: string };
  review?: any[]; // Array de reviews, tipar melhor se usar
}
