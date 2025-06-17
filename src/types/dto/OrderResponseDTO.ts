import { EventDTO } from "./EventDTO";
import { OrderDTO } from "./OrderDTO";
import { UserDTO } from "./UserDTO";

export interface OrderResponseDTO {
  order: OrderDTO;
  user: UserDTO;
  event: EventDTO;
}
