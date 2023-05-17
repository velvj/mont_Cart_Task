import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../instances/sequelize";

//product interface
export interface ProductData {
  product_id: number;
  product_name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  date: string;
  color: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends Model<ProductData> {}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    product_name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    tableName: "product", //DB table name
    sequelize, // passing the `sequelize` instance is required
  }
);
