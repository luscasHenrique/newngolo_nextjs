// src/types/product/cart.ts
export interface CartGrade {
  id: string;
  gradeSizeId: string;
  name: string;
  color: string;
  size: string;
  price: number;
}
export interface CartProduct {
  id: string;
  name: string;
  quantity: number;
  totalValue: number;
  grade: CartGrade;
}
export interface ProductAddCartPayload {
  id: string;
  product: CartProduct;
  quantity: number;
  totalValue: number;
}
