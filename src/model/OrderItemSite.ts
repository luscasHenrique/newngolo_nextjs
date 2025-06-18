// import EventSiteGet from './EventSiteGet';
import { OrderTicket } from './OrderTicket';

export default interface OrderItemSite {
  id: string;
  //   event: EventSiteGet;
  sequence: number;
  unitValue: number;
  fee: number;
  commission: number;
  paymentFee: number;
  totalValue: number;
  orderTicket: OrderTicket;
  halfPrice: boolean;
  isCourtesy: boolean;
  itemLabel: string;
  itemName: string;
  itemSeat: number;
  posItemId: string;
}
