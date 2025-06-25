// import DiscountCoupon from './DiscountCoupon';
import OrderItemSite from './OrderItemSite';
// import Voucher from './Voucher';

export default interface OrderSite {
  id: string;
  orderDate: Date;
  isCourtesy: boolean;
  onlineSale: boolean;
  //   discountCoupon?: DiscountCoupon;
  //   voucher?: Voucher;
  amount: number;
  totalValue: number;
  items: OrderItemSite[];
}
