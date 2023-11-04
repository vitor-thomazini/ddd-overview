import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    // Act
    const customer = CustomerFactory.create("John");

    // Assert
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    // Arrange
    const address = new Address("Street", "123", "Zip", "City");
    
    // Act
    const customer = CustomerFactory.createWithAddress("John", address);
    
    // Assert
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address); 
  });
});