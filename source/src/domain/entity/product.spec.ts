import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Product("123", "", 100);
    }).toThrowError("Name is required");
  });
  
  it("should throw error when name is less than zero", () => {
    // Assert
    expect(() => {
      // Act
      new Product("123", "Product 1", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    // Arrange
    const newName = "Product 2";
    const product = new Product("123", "Product 1", 100);
      
    // Act
    product.changeName(newName);
    
    // Assert
    expect(product.name).toBe(newName); 
  });

  it("should change price", () => {
    // Arrange
    const newPrice = 150;
    const product = new Product("123", "Product 1", 100);
      
    // Act
    product.changePrice(newPrice);
    
    // Assert
    expect(product.price).toBe(newPrice); 
  });
});