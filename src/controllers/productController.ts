import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import productService from "../services/productService";

class ProductDetails extends BaseController {
  //bulk create and update product
  async bulkUpdateCreate(req: Request, res: Response, next: NextFunction) {
    try {
      let data: any = await productService.productBulkUpdate( req.body);
      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        data,
        "Bulk Create and Updated"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions(req, e)
      );
    }
  }

  //create product
  async productData(req: Request, res: Response, next: NextFunction) {
    try {
      let data:any = await productService.addProduct(req.body);
      return this.success(req, res, this.status.HTTP_CREATED, data, "Added");
    } catch (e) {
     return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
  //list Of products
  async listProducts(req: Request, res: Response, next: NextFunction) {
    try {
      let data:any = await productService.listProduct();
      return this.success(req, res, this.status.HTTP_OK, data, "Product Lists");
    } catch (e) {
     return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
}

export default new ProductDetails();
