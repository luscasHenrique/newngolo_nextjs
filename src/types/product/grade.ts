// src/types/product/grade.ts
export interface GradeSize {
  id: string;
  size: string;
  price: { price: number };
}
export interface Grade {
  id: string;
  name: string;
  color: string;
  image?: string;
  gradeSizes: GradeSize[];
}
