import { Router } from "express";
const cartRouters = Router();
import cartController from "../../controllers/cartController";
import { cartSchema, validateSchema } from "../../middleware/validate";

//cart Routes
cartRouters.post("/bulkUpdate", (req, res, next) =>
  cartController.bulkUpdateCreate(req, res, next)
);

cartRouters.post("/bulkCreate", (req, res, next) =>
  cartController.bulkCreateCart(req, res, next)
);

cartRouters.post("/cartCreate", (req, res, next) =>
  cartController.cartData(req, res, next)
);
cartRouters.get("/userCart", (req, res, next) =>
  cartController.findCartUser(req, res, next)
);
cartRouters.put(
  "/updateCart/:id",
  validateSchema(cartSchema),
  (req, res, next) => cartController.updateCart(req, res, next)
);
cartRouters.put("/isDeleted/:id", (req, res, next) =>
  cartController.isDelete(req, res, next)
);

export default cartRouters;
