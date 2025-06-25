// import { CardStatus } from './CardStatus';
import CardType from './CardType';

export default interface CardClient {
  selected?: boolean;
  id: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardCvv: string;
  cardholderName: string;
  cardholderCpf: string;
  cardType: CardType;
  // cardStatus: CardStatus;
}
