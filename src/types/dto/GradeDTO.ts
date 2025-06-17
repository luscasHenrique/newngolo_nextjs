import { StatusType } from "../enums/StatusType";
import { GradeSizeDTO } from "./GradeSizeDTO";

export interface GradeDTO {
  id: string; // UUID
  name: string;
  color: string;
  image: string;
  status: StatusType;
  gradeSizes: GradeSizeDTO[];
}
