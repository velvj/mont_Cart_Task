import { Product, ProductData } from "../models/product";

class ProductService {
  //Create bulk product
  async productBulkUpdate(data: any) {
    try {
      let result: any = await Product.bulkCreate(data, {
        fields: [
          "product_name",
          "brand",
          "category",
          "color",
          "date",
          "description",
          "price",
          "model",
          "product_id",
        ],
        updateOnDuplicate: [
          "product_name",
          "brand",
          "category",
          "color",
          "date",
          "description",
          "price",
          "model",
          "product_id",
        ],
      });
      return result;
    } catch (e) {
      return e;
    }
  }

  //create product
  async addProduct(data: any): Promise<ProductData> {
    try {
      let result: any = await Product.create(data);
      return result;
    } catch (e) {
      return e;
    }
  }

  //list of products
  async listProduct(): Promise<ProductData[]> {
    try {
      let result: any = await Product.findAll();
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new ProductService();
