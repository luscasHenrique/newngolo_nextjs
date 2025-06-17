import { StatusType } from "../enums/StatusType";
import { Product } from "./Product";

export interface Dimensions {
  id: string; // UUID
  width: string;
  height: string;
  depth: string;
  weight: string;
  dateAt: string; // Date
  updateAt: string; // Date
  status: StatusType;
  product: Product;
}
