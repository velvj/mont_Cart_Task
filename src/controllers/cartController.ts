import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { BaseController } from "./baseController";
import cartService from "../services/cartService";
import { Product } from "../models/product";
import { User } from "../models/user";

class CartDetails extends BaseController {
  //Create bulk cart
  async bulkCreateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      let checkData: any = await cartService.findUserCart({
        where: {
          customer_id: payload[0].customer_id,
        },
      });
      const bulkCartProduct = await payload.map(async (payloadCart: any) => {
        const isExist = checkData.some(
          (existCart: any) => payloadCart.product_id === existCart.product_id
        );
        const product = checkData.find(
          (existCart: any) => payloadCart.product_id === existCart.product_id
        );
        if (isExist) {
          // update function
          const finalData = await cartService.updateCart(
            { qty: payloadCart.qty + product.qty },
            {
              where: {
                [Op.and]: {
                  customer_id: payloadCart.customer_id,
                  product_id: payloadCart.product_id,
                },
              },
            }
          );
        } else {
          // insert function
          return payloadCart;
        }
      });

      let cartProducts: any = await Promise.all(bulkCartProduct);
      cartProducts = await cartProducts.filter((product: any) => {
        if (product !== null) return product;
      });
      await cartService.createBulkCart(cartProducts);

      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        cartProducts,
        "Bulk Added Cart"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  //create and update bulk cart
  async bulkUpdateCreate(req: Request, res: Response, next: NextFunction) {
    try {
      let payload = req.body;
      let data: any = await cartService.updateBulkCart(payload);
      let cartIds = await data.map(async (e: any) => {
        return e.id;
      });
      const totalList: any = await Promise.all(cartIds);
      let checkUpdate = await cartService.updateCart(
        { is_delete: true, raw: true },
        {
          where: {
            customer_id: data[0].customer_id,
            id: { [Op.notIn]: totalList },
          },
          returning: true,
          plain: true,
        }
      );
      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        "Bulk update and created"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  //find user delete and live cart 
  async findCartUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.customer_id) {
        let userList: any = await cartService.findUserCart({
          include: [
            {
              model: Product,
              as: "product",
              attributes: [
                "product_name",
                "color",
                "description",
                "brand",
                "model",
                "price",
                "category",
                "date",
              ],
            },
            {
              model: User,
              as: "customer",
              attributes: ["name", "email"],
            },
          ],
          where: { customer_id: req.body.customer_id },
          raw: false,
        });
        let data = await userList.filter((e: any) => e.is_delete === true);
        return this.success(
          req,
          res,
          this.status.HTTP_OK,
          data,
          "UserCart Deleted lists"
        );
      } else if (req.query.id) {
        let userList: any = await cartService.findUserCart({
          where: { customer_id: req.query.id },
          include: [
            {
              model: Product,
              as: "product",
              attributes: [
                "product_name",
                "color",
                "description",
                "brand",
                "model",
                "price",
                "category",
                "date",
              ],
            },
            {
              model: User,
              as: "customer",
              attributes: ["name", "email"],
            },
          ],
          raw: false,
        });
        let data = await userList.filter((e: any) => e.is_delete === false);
        return this.success(
          req,
          res,
          this.status.HTTP_OK,
          data,
          "UserCart lists "
        );
      }
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  //create cart without bulkCreate query
  async cartData(req: Request, res: Response, next: NextFunction) {
    try {
      let payload = req.body;
      const checkData: any = await payload.map(async (e: any) => {
        let findCreate = await cartService.findOneOrCreate({
          where: {
            [Op.and]: [
              { product_id: e.product_id },
              { customer_id: e.customer_id },
            ],
          },
          defaults: { customer_id: e.customer_id, product_id: e.product_id },
        });
        if (findCreate[1] == false) {
          let data = await cartService.updateCart(
            { qty: findCreate[0].qty + 1 },
            {
              where: {
                [Op.and]: [
                  { customer_id: findCreate[0].customer_id },
                  { product_id: findCreate[0].product_id },
                ],
              },
            }
          );
        }
      });
      const productCheck: any = await Promise.all(checkData);
      return this.success(req, res, this.status.HTTP_CREATED, "Added");
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  //update cart
  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      let updateCart = await cartService.updateCart(req.body, {
        where: { id: req.params.id },
      });
      return this.success(req, res, this.status.HTTP_OK, updateCart, "Cart Updated");
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  //is Delete cart
  async isDelete(req: Request, res: Response, next: NextFunction) {
    try {
      let proCheck = await cartService.findOneCart({
        where: { id: req.params.id },
      });
      if (proCheck.qty == 0) {
        let updateCart = await cartService.updateCart(
          { isDelete: true },
          { where: { id: proCheck.id } }
        );
        return this.success(req, res, this.status.HTTP_OK, updateCart, "Deleted");
      } else {
        let updateCart = await cartService.updateCart(
          { qty: proCheck.qty - 1 },
          { where: { id: proCheck.id } }
        );
        return this.success(
          req,
          res,
          this.status.HTTP_OK,
          updateCart,
          "Same product deleted"
        );
      }
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

export default new CartDetails();
