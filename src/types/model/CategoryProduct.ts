import { Category } from "./Category";
import { Product } from "./Product";

export interface CategoryProduct {
  id: string; // UUID
  product: Product;
  category: Category;
}
