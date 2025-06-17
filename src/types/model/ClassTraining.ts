import { StatusType } from "../enums/StatusType";
import { Training } from "./Training";

export interface ClassTraining {
  id: string; // UUID
  day: string;
  hour: string;
  createdAt: string; // Date
  status: StatusType;
  training: Training;
}
