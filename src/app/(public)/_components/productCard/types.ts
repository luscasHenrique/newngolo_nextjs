// types/product.ts

export type ProductTagType = "oferta" | "frete" | "novidade";

export interface Product {
  id: string;
  slug: string;
  imageUrl: string;
  tagText: string;
  tagType?: ProductTagType;
  name: string;
  description: string;
  rating?: number; // Avaliação de 0 a 5, agora opcional
  reviewCount?: number;
  price: string; // Preço final, já formatado
  originalPrice?: string; // Preço original para exibição de desconto
}
