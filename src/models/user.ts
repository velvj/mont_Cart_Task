import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/sequelize";

//user interface
export interface UserData {
  customer_id: number;
  name: string;
  email: string | null;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Model<UserData> {}

User.init(
  {
    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    tableName: "user", // DB table name
    sequelize, // passing the `sequelize` instance is required
  }
);
