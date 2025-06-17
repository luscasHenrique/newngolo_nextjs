import { Product } from "./Product";

export interface Image {
  id: string; // UUID
  imageUrl: string;
  product: Product;
  dateAt: string; // Date
}
