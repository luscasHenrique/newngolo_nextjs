// import CartEventTicketUserData from './CartEventTicketUserData';
import OrderItemType from './OrderItemType';
// import Section from './Section';
import StatusType from './StatusType';

export default interface OrderItem {
  id: string;
  name: string;
  amount: number;
  unitValue: number;
  statusType: StatusType;
  itemType: OrderItemType;
  //   userData?: CartEventTicketUserData;
  transferDate?: Date;
  useDate?: Date;
  //   section: Section;
}
