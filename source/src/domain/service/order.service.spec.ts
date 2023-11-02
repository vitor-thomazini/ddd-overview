import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    // Arrange
    const expectedTotal = 500;
    const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
    const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);
    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);

    // Act
    const total = OrderService.total([order1, order2]);

    // Assert
    expect(total).toBe(expectedTotal);
  });

  it("should place an order", () => {
    // Arrange
    const expectedRewardPoints = 5;
    const expectedTotalOrder = 10;
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("i1", "p1", "Item 1", 10, 1);

    // Act
    const order = OrderService.placeOrder(customer, [item1]);

    // Arrange
    expect(customer.rewardPoints).toBe(expectedRewardPoints);
    expect(order.total).toBe(expectedTotalOrder);
  });
});