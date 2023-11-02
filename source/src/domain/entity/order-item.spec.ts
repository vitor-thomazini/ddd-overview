import { OrderItem } from "./order-item";

describe("Order Item unit tests", () => {
  it("should throw error when id is empty", () => {
    // Assert
    expect(() => {
      // Act
      new OrderItem("", "p1", "Product 1", 100, 1);
    }).toThrowError("Id is required");
  });
  
  it("should throw error when id is empty", () => {
    // Assert
    expect(() => {
      // Act
      new OrderItem("123", "", "Product 1", 100, 1);
    }).toThrowError("ProductId is required");
  }); 

  it("should throw error when id is empty", () => {
    // Assert
    expect(() => {
      // Act
      new OrderItem("123", "p1", "", 100, 1);
    }).toThrowError("Name is required");
  });

  it("should calculate total when quantity is one", () => {
    // Arrange
    const expectTotal = 100;
    const orderItem = new OrderItem("123", "p1", "Product 1", 100, 1);
    
    // Act
    const total = orderItem.total();

    // Assert
    expect(total).toBe(expectTotal);
  });

  it("should calculate total when quantity more than one", () => {
    // Arrange
    const expectTotal = 300;
    const orderItem = new OrderItem("123", "p1", "Product 1", 100, 3);
    
    // Act
    const total = orderItem.total();

    // Assert
    expect(total).toBe(expectTotal);
  });
});