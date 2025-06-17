import { StatusType } from "../enums/StatusType";
import { Grade } from "./Grade";
import { PriceProduct } from "./PriceProduct";

export interface GradeSize {
  id: string; // UUID
  size: string;
  grade: Grade;
  stock: string;
  status: StatusType;
  prices: PriceProduct;
  dateAt: string; // Date
}
