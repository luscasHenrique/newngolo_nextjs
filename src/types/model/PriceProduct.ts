import { StatusType } from "../enums/StatusType";
import { GradeSize } from "./GradeSize";

export interface PriceProduct {
  id: string; // UUID
  price: number;
  discount: number;
  dateAt: string; // Date
  updateAt: string; // Date
  gradeSize: GradeSize;
  status: StatusType;
}
