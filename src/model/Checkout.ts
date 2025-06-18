import { Events } from './Event';
import { Mestre } from './Mestre';

export interface Checkout {
  event: Events;
  mestre: Mestre;
  imagePix: string;
  numberPix: string;
}
