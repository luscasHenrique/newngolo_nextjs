import { StatusType } from "../enums/StatusType";
import { TrainingType } from "../enums/TrainingType";
import { Address } from "../model/Address";

export interface TrainingDTO {
  id: string; // UUID
  type: TrainingType;
  name: string;
  userUUID: string; // UUID
  status: StatusType;
  address: Address;
}
