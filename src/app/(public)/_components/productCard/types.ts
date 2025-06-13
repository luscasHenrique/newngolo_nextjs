export type ProductTagType = "oferta" | "frete" | "novidade";

export interface Product {
  id: string;
  imageUrl: string;
  tagText: string;
  tagType?: ProductTagType;
  name: string;
  description: string;
  rating?: number; // 0 a 5
  price: string;
  originalPrice?: string;
}
