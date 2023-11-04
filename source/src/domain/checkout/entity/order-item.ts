import { OrderItemInterface } from "./order-item.interface";

export class OrderItem implements OrderItemInterface {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string, 
    productId: string,
    name: string, 
    price: number,
    quantity: number
  ) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this.validate();
  }

  get id(): string {
    return this._id
  }

  get productId(): string {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._productId.length === 0) {
      throw new Error("ProductId is required");
    }
    return true;
  }

  total(): number {
    return this._price * this._quantity;
  }
}