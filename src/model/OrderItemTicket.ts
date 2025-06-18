// import CartEventTicketUserData from './CartEventTicketUserData';
import OrderItemType from './OrderItemType';
import StatusType from './StatusType';

export default interface OrderItemTicket {
  id: string;
  name: string;
  amount: number;
  unitValue: number;
  statusType: StatusType;
  itemUrl: string;
  itemType: OrderItemType;
  //   userData?: CartEventTicketUserData;
  transferDate?: Date;
  useDate?: Date;
}
