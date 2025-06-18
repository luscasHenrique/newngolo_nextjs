import { TrainingData } from './TrainingData';
import { Client } from './User';

export interface TrainingForMestre {
  user: Client;
  trainings: TrainingData[];
}
