import { User } from "./User";

export interface Anamnesis {
  id: string; // UUID
  user: User;
  hasInjury: boolean;
  injuryDescription?: string;
  usesMedication: boolean;
  medications?: string;
  hasDisease: boolean;
  diseaseDescription?: string;
  psychologicalAspects?: string;
  feedingHabits?: string;
  familySupport: boolean;
  socialBehavior?: string;
  createdAt: string; // Date
}
