import { Client } from './User';
import { Order } from './Order';
import { Events } from './Event';

export interface OrderResponse {
  order: Order;
  user: Client;
  event: Events;
}
