import { Cart, CartData } from "../models/cart";

class CartService {
  //create and update bulk cart
  async updateBulkCart(data: any) {
    try {
      let result: any = await Cart.bulkCreate(data, {
        fields: ["product_id", "customer_id", "qty", "id"],
        updateOnDuplicate: ["product_id", "customer_id", "qty", "id"],
      });
      return result;
    } catch (e) {
      return e;
    }
  }

  //Create bulk cart
  async createBulkCart(data: any) {
    try {
      let result: any = await Cart.bulkCreate(data);
      return result;
    } catch (e) {
      return e;
    }
  }

  //find user cart data
  async findUserCart(data?: any): Promise<CartData> {
    try {
      let result: any = await Cart.findAll(data);
      return result;
    } catch (e) {
      return e;
    }
  }

  //updated cart data
  async updateCart(data: any, cartID: any): Promise<CartData> {
    try {
      let result: any = await Cart.update(data, cartID);
      return result;
    } catch (e) {
      return e;
    }
  }

  //findone cart data
  async findOneCart(data: any): Promise<CartData> {
    try {
      let result: any = await Cart.findOne(data);
      return result;
    } catch (e) {
      return e;
    }
  }

  //findOne or Create cart
  async findOneOrCreate(data: any) {
    try {
      let result: any = await Cart.findOrCreate(data);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new CartService();
