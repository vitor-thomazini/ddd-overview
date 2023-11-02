import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    // Arrange
    const expectPriceProduct1 = 20
    const expectPriceProduct2 = 40;
    const product1 = new Product("product1", "Product 1", 10);
    const product2 =new Product("product2", "Product 2", 20);
    const products = [product1, product2];

    // Act
    ProductService.increasePrice(products, 100);
    
    // Assert
    expect(product1.price).toBe(expectPriceProduct1);
    expect(product2.price).toBe(expectPriceProduct2);
  });
});