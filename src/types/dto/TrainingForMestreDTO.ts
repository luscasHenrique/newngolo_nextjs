import { TrainingResponseDTO } from "./TrainingResponseDTO";
import { UserDTO } from "./UserDTO";

export interface TrainingForMestreDTO {
  user: UserDTO;
  trainings: TrainingResponseDTO[];
}
