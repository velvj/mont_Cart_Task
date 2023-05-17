import { Express } from "express";

import userDetails from "./v1/userRouter";
import productDetails from "./v1/productRouter";
import cartDetails from "./v1/cartRouter";

const initializeRoutes = (app: Express) => {
  // console.log("inside route");
  // Routes
  app.use("/user", userDetails);
  app.use("/product", productDetails);
  app.use("/cart", cartDetails);
};

export default initializeRoutes;
