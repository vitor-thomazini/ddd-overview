import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CustomerModel } from "../../../customer/sequelize/model/customer.model";
import { OrderItemModel } from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel, { constraints: false })
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare items: OrderItemModel[]

  @Column({ allowNull: false })
  declare total: number;
}