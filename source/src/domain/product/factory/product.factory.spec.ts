import { ProductFactory } from "./product.factory";

describe("Product factory unit tests", () => {
  it("should create a product type a", () => {
    // Act
    const product = ProductFactory.create("a", "Product A", 1);

    // Assert
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    // Act
    const product = ProductFactory.create("b", "Product B", 1);

    // Assert
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B")
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    // Assert 
    expect(() => {
      // Act
      ProductFactory.create("c", "Product C", 1)
    }).toThrowError("Product type is not supported");
  });
});