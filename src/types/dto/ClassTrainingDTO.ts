import { StatusType } from "../enums/StatusType";

export interface ClassTrainingDTO {
  id: string; // UUID
  day: string;
  hour: string;
  status: StatusType;
  trainingUUID: string; // UUID
}
