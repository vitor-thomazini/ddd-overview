import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ CustomerModel ])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");
    const expectedCustomerModel = {
      id: "1",
      name: "Customer 1",
      street: "Street 1",
      number: "1", 
      zipCode: "ZipCode 1",
      city: "City 1",
      active: false,
      rewardPoints: 0,
    };

    customer.changeAddress(address);

    // Act
    await customerRepository.create(customer);
    
    // Assert
    const insertedCustomerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(insertedCustomerModel.toJSON()).toStrictEqual(expectedCustomerModel);
  });

  it("should update a product", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");
    const address2 = new Address("Street 2", "2", "ZipCode 2", "City 2");
    const expectedCustomerModel = {
      id: "1",
      name: "Customer 2",
      street: "Street 2",
      number: "2", 
      zipCode: "ZipCode 2",
      city: "City 2",
      active: false,
      rewardPoints: 0,
    };

    customer.changeAddress(address);
    await customerRepository.create(customer);
    customer.changeName("Customer 2");
    customer.changeAddress(address2);

    // Act
    await customerRepository.update(customer);
    
    // Assert
    const updatedCustomerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(updatedCustomerModel.toJSON()).toStrictEqual(expectedCustomerModel);
  });

  it("should find a customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    // Act
    const foundedCustomer = await customerRepository.find("1");
    
    // Assert
    expect(foundedCustomer).toEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    
    // Assert
    expect(async () => {
      // Act
      await customerRepository.find("1")
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customer", async () => {
    // Arrange
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", "1", "ZipCode 1", "City 1");
    const customer2 = new Customer("2", "Customer 2 ");
    const address2 = new Address("Street 2", "2", "ZipCode 2", "City 2");

    customer1.changeAddress(address1);
    customer2.changeAddress(address2);
    const expectedCustomers = [customer1, customer2]; 

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    // Act
    const foundedCustomers = await customerRepository.findAll();
    
    // Assert
    expect(foundedCustomers).toEqual(expectedCustomers);
  });
});