import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    // Assert
    expect(() => {
      // Act
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane")
  });

  it("should throw error when change name to empty", () => {
    // Assert
    expect(() => {
      // Arrange
      const customer = new Customer("123", "John");

      // Act
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("should activate customer", () => {
    // Arrange
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", "123", "13338-250", "São Paulo");
    customer.changeAddress(address);

    // Act
    customer.activate();

    // Assert
    expect(customer.isActive()).toBeTruthy();
  });

  it("should deactivate customer", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.deactivate();

    // Assert
    expect(customer.isActive()).toBeFalsy();
  });

  it("should throw error when address is undefined", () => {
    // Assert
    expect(() => {
      // Arrange
      const customer = new Customer("123", "John");

      // Act
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    // Arrange
    const expectedInitialRewardPoints = 0;
    const expectedSecondRewardPoints = 10;
    const expectedThirdRewardPoints = 20;
    const customer = new Customer("1", "Customer 1");

    // Assert - Initial
    expect(customer.rewardPoints).toBe(expectedInitialRewardPoints);

    // Act - Second
    customer.addRewardPoints(10);

    // Assert - Second
    expect(customer.rewardPoints).toBe(expectedSecondRewardPoints);

    // Act - Third
    customer.addRewardPoints(10);

    // Assert - Third 
    expect(customer.rewardPoints).toBe(expectedThirdRewardPoints)
  });
});