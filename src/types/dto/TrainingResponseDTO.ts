import { ClassTrainingDTO } from "./ClassTrainingDTO";
import { TrainingDTO } from "./TrainingDTO";

export interface TrainingResponseDTO {
  training: TrainingDTO;
  classTraining: ClassTrainingDTO[];
}
