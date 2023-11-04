import { OrderItemInterface } from "./order-item.interface";

export interface OrderInterface {
  
  get id(): string;

  get customerId(): string;

  get items(): OrderItemInterface[];

}