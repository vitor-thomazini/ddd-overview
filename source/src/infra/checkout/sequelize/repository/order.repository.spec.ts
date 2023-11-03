import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../customer/sequelize/model/customer.model";
import { CustomerRepository } from "../../../customer/sequelize/repository/customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { OrderModel } from "../model/order.model";
import { OrderItemModel } from "../model/order-item.model";
import { ProductModel } from "../../../product/sequelize/model/product.model";
import { ProductRepository } from "../../../product/sequelize/repository/product.repository";
import { Product } from "../../../../domain/product/entity/product";
import { OrderItem } from "../../../../domain/checkout/entity/order-item";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderRepository } from "./order.repository";

const repository = (sequelize: Sequelize) => {
  const customer = new CustomerRepository();
  const product = new ProductRepository();
  const order = new OrderRepository(sequelize);
  return { customer, product, order }
}

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ CustomerModel, OrderModel, OrderItemModel, ProductModel ])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    // Arrange
    const sut = repository(sequelize);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await sut.customer.create(customer);

    const product = new Product("1", "Product 1", 100);
    await sut.product.create(product);

    const orderItem = new OrderItem("1", "1", "Product 1", 100, 2);
    const order = new Order("1", "1", [orderItem]);

    const expectedOrder = {
      id: "1",
      customer_id: "1",
      total: 200,
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
          quantity: 2,
          product_id: "1",
          order_id: "1",
        },
      ],
    };
    
    // Act
    await sut.order.create(order);

    // Assert
    const orderModel = await OrderModel.findOne({ 
      where: { id: "1" },
      include: ["items"],
    });
    expect(orderModel.toJSON()).toStrictEqual(expectedOrder);
  });

  it("should update a product", async () => {
    // Arrange
    const sut = repository(sequelize);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await sut.customer.create(customer);

    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 300);
    const product3 = new Product("3", "Product 3", 100);
    await sut.product.create(product1);
    await sut.product.create(product2);
    await sut.product.create(product3);

    const orderItem1 = new OrderItem("1", "1", "Product 1", 100, 2);
    const orderItem2 = new OrderItem("2", "2", "Product 2", 300, 3);
    const orderItem3 = new OrderItem("3", "3", "Product 3", 200, 3);
    const orderItem4 = new OrderItem("2", "4", "Product 4", 400, 4);
    const order1 = new Order("1", "1", [orderItem1, orderItem2, orderItem3]);
    await sut.order.create(order1);

    const product4 = new Product("2", "Product 4", 400);
    await sut.product.update(product4)

    const order2 = new Order("1", "2", [orderItem1, orderItem4]);

    const expectedOrder = {
      id: "1",
      customer_id: "2",
      total: 1800,
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
          quantity: 2,
          product_id: "1",
          order_id: "1",
        },
        {
          id: "2",
          name: "Product 4",
          price: 400,
          quantity: 4,
          product_id: "4",
          order_id: "1",
        },
      ],
    };

    // Act
    await sut.order.update(order2);

    // Assert
    const orderModel = await OrderModel.findOne({ 
      where: { id: "1" },
      include: ["items"],
    });
    expect(orderModel.toJSON()).toStrictEqual(expectedOrder);
  });

  it("should find a customer", async () => {
    // Arrange
    const sut = repository(sequelize);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await sut.customer.create(customer);

    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    const product3 = new Product("3", "Product 3", 300);
    await sut.product.create(product1);
    await sut.product.create(product2);
    await sut.product.create(product3);

    const orderItem1 = new OrderItem("1", "1", "Product 1", 100, 1);
    const orderItem2 = new OrderItem("2", "2", "Product 2", 200, 2);
    const orderItem3 = new OrderItem("3", "3", "Product 3", 300, 3);
    const order = new Order("1", "1", [orderItem1, orderItem2, orderItem3]);
    await sut.order.create(order);
     
    // Act
    const foundedOrder = await sut.order.find("1");

    // Assert
    expect(foundedOrder).toEqual(order);
  });

  it("should findAll orders", async () => {
    // Arrange
    const sut = repository(sequelize);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await sut.customer.create(customer);

    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    await sut.product.create(product1);
    await sut.product.create(product2);

    const orderItem1 = new OrderItem("1", "1", "Product 1", 100, 1);
    const orderItem2 = new OrderItem("2", "2", "Product 2", 200, 2);
    const orderItem4 = new OrderItem("3", "1", "Product 1", 100, 1);
    const order1 = new Order("1", "1", [orderItem1, orderItem2]);
    const order2 = new Order("2", "2", [orderItem4]);
    await sut.order.create(order1);
    await sut.order.create(order2);

    const expectedOrders = [order1, order2];
     
    // Act
    const foundedOrders = await sut.order.findAll();

    // Assert
    expect(foundedOrders).toEqual(expectedOrders);
  });
});