import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../instances/sequelize";
import { Product } from "./product";
import { User } from "./user";

//cart interface
export interface CartData {
  id: string;
  product_id: number;
  customer_id: number;
  qty: number;
  is_delete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Cart extends Model<CartData> {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    tableName: "cart",
    sequelize,
  }
);
//Association 
Cart.hasMany(Product, {
  sourceKey: "product_id",
  foreignKey: "product_id",
  as: "product", // this determines the name in `associations`!
});
Cart.hasMany(User, {
  sourceKey: "customer_id",
  foreignKey: "customer_id",
  as: "customer", // this determines the name in `associations`!
});
