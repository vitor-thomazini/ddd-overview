import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderInterface } from "../entity/order.interface";

export type OrderItemFactoryProps = {
  id: string,
  name: string,
  productId: string,
  quantity: number, 
  price: number
}

export type OrderFactoryProps = {
  id: string,
  customerId: string,
  items: OrderItemFactoryProps[],
}

export class OrderFactory {
  public static create(props: OrderFactoryProps): OrderInterface {
    const orderItems = props.items.map((item) => (
      new OrderItem(
        item.id, 
        item.productId, 
        item.name, 
        item.price, 
        item.quantity
      )
    ));

    return new Order(props.id, props.customerId, orderItems);
  }
}