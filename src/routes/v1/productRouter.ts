import { Router } from "express";
const productRouters = Router();
import productDetails from "../../controllers/productController";
import { productSchema, validateSchema } from "../../middleware/validate";
import authentication from "../../middleware/authentication";

//product Routes
productRouters.post("/bulkUpdate", (req, res, next) =>
  productDetails.bulkUpdateCreate(req, res, next)
);

productRouters.post(
  "/productCreate",
  authentication.authenToken,
  validateSchema(productSchema),
  (req, res, next) => productDetails.productData(req, res, next)
);

productRouters.get("/listProducts", (req, res, next) =>
  productDetails.listProducts(req, res, next)
);

export default productRouters;
