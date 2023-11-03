import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../model/product.model";
import { Product } from "../../../../domain/product/entity/product";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ ProductModel ])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    const expectedProductModel = {
      id: "1",
      name: "Product 1",
      price: 100
    };

    // Act
    await productRepository.create(product);
    
    // Assert
    const insertedProductModel = await ProductModel.findOne({ where: { id: "1" } });
    expect(insertedProductModel.toJSON()).toStrictEqual(expectedProductModel);
  });

  it("should update a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    const expectedProductModel = {
      id: "1",
      name: "Product 2",
      price: 200
    };

    await productRepository.create(product);
    product.changeName("Product 2");
    product.changePrice(200);

    // Act
    await productRepository.update(product);
    
    // Assert
    const updatedProductModel = await ProductModel.findOne({ where: { id: "1" } });
    expect(updatedProductModel.toJSON()).toStrictEqual(expectedProductModel);
  });

  it("should find a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    // Act
    const foundedProduct = await productRepository.find("1");
    
    // Assert
    expect(foundedProduct).toEqual(product);
  });

  it("should find all products", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    const expectedProducts = [product1, product2];

    await productRepository.create(product1);
    await productRepository.create(product2);
   
    // Act
    const foundedProducts = await productRepository.findAll();
    
    // Assert
    expect(foundedProducts).toEqual(expectedProducts);
  });
});