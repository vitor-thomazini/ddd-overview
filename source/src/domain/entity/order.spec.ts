import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Order("", "123", []);
    }).toThrowError("Id is required")
  });

  it("should throw error when customerId is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when customerId is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total for one item", () => {
    // Arrange
    const expectTotal = 100;
    const items = [
      new OrderItem("i1", "p1", "Item 1", 100, 1)
    ];
    const order = new Order("123", "123", items);
    
    // Act
    const total = order.calculateTotal();    

    // Assert
    expect(total).toBe(expectTotal);
  });

  it("should calculate total for more than one item", () => {
    // Arrange
    const expectTotal = 600;
    const items = [
      new OrderItem("i1", "p1", "Item 1", 100, 2),
      new OrderItem("i2", "p2", "Item 2", 200, 2)
    ];
    const order = new Order("123", "123", items);
    
    // Act
    const total = order.calculateTotal();    

    // Assert
    expect(total).toBe(expectTotal);
  });

  it("should throw erro if item quantity is less or equal zero", () => {
    // Assert
    expect(() => {
      // Arrange
      const items = [
        new OrderItem("i1", "p1", "Item 1", 100, 0)
      ];

      // Act
      const order = new Order("123", "123", items);
    }).toThrowError("Quantity must be greater than zero");
  });
});