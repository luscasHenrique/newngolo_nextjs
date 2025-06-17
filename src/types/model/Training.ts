import { StatusType } from "../enums/StatusType";
import { TrainingType } from "../enums/TrainingType";
import { Address } from "./Address";
import { User } from "./User";

export interface Training {
  id: string; // UUID
  type: TrainingType;
  name: string;
  user: User;
  createdAt: string; // Date
  status: StatusType;
  address: Address;
}
