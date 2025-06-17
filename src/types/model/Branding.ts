import { StatusType } from "../enums/StatusType";
import { Product } from "./Product";

export interface Branding {
  id: string; // UUID
  name: string;
  dateAt: string; // Date
  updateAt: string; // Date
  product: Product;
  status: StatusType;
}
