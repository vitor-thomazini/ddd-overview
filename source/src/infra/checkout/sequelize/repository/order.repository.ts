import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/order-repository.interface";
import { OrderItemModel } from "../model/order-item.model";
import { OrderModel } from "../model/order.model";
import { Op } from "sequelize";
import { OrderItem } from "../../../../domain/checkout/entity/order-item";

export class OrderRepository implements OrderRepositoryInterface {
  constructor(readonly sequelize: Sequelize) {}

  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{
        model: OrderItemModel
      }]
    });
  }

  async update(entity: Order): Promise<void> {
    const transaction = await this.sequelize.transaction();
    const makeItem = (item: OrderItem) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity
    })

    try {
      const orderItemsModels = await OrderItemModel.findAll({ where: { order_id: entity.id }});
      const itemsModelDiffItemsEntity = orderItemsModels.map(async (orderItemModel) => {
        const item = entity.items.find(item => item.id === orderItemModel.id);
        if (!item) {
          return Promise.resolve(orderItemModel.destroy({ transaction: transaction }));
        } else {
          orderItemModel.set(makeItem(item));
          return Promise.resolve(orderItemModel.save({ transaction: transaction }));
        }
      });

      const itemsEntityDiffItemModel = entity.items.filter((item) => {
        return !!orderItemsModels.find(itemModel => item.id !== itemModel.id && !itemModel.id)
      }).map((item) => (
        OrderItemModel.build(makeItem(item))
      ));

      await Promise.all([itemsModelDiffItemsEntity, itemsEntityDiffItemModel]);

      await OrderModel.update({
        customer_id: entity.customerId,
        total: entity.total,
      }, {
        where: { id: entity.id },
        transaction: transaction,
      });

      transaction.commit();
    } catch (error) {
      console.log(error)
      transaction.rollback();
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: [{
        model: OrderItemModel
      }]
    });

    const orderItems = orderModel.items.map((itemModel) => (
      new OrderItem(itemModel.id, itemModel.product_id, 
        itemModel.name, itemModel.price, itemModel.quantity)
    ));

    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const ordersModels = await OrderModel.findAll({
      include: [{
        model: OrderItemModel
      }]
    });

    return ordersModels.map((orderModel) => {
      const orderItems = orderModel.items.map((itemModel) => (
        new OrderItem(itemModel.id, itemModel.product_id, 
          itemModel.name, itemModel.price, itemModel.quantity)
      ));
  
      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    });
  }
}