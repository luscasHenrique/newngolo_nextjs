import { StatusType } from "../enums/StatusType";
import { Product } from "./Product";

export interface Warranty {
  id: string; // UUID
  warranty: string;
  dateAt: string; // Date
  updateAt: string; // Date
  status: StatusType;
  product: Product;
}
