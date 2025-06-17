import { StatusType } from "../enums/StatusType";
import { GradeSize } from "./GradeSize";
import { Product } from "./Product";

export interface Grade {
  id: string; // UUID
  name: string;
  color: string;
  image: string;
  product: Product;
  status: StatusType;
  dateAt: string; // Date
  gradeSizes: GradeSize[];
}
