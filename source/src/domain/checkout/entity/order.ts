import { OrderItem } from "./order-item";
import { OrderInterface } from "./order.interface";

export class Order implements OrderInterface {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.calculateTotal();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get total(): number {
    return this._total;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length == 0) {
      throw new Error("CustomerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero")
    }
    return true;
  }

  calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}