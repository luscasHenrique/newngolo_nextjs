import { StatusType } from "../enums/StatusType";
import { Product } from "./Product";

export interface Tags {
  id: string; // UUID
  tag: string;
  dateAt: string; // Date
  updateAt: string; // Date
  status: StatusType;
  product: Product;
}
