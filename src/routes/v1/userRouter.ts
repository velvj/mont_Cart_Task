import * as express from "express";
const userRouters = express.Router();
import { userSchema, validateSchema } from "../../middleware/validate";
import userDetails from "../../controllers/userController";
import userController from "../../controllers/userController";

//user Routes
userRouters.post("/userCreate", validateSchema(userSchema), (req, res, next) =>
  userDetails.userData(req, res, next)
);
userRouters.post("/login", (req, res, next) =>
  userController.login(req, res, next)
);
userRouters.get("/listUsers", (req, res, next) =>
  userController.findUsersList(req, res, next)
);

export default userRouters;
