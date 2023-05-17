import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { BaseController } from "./baseController";
import userService from "../services/userService";
import { generateToken } from "../utils/authToken";

//user Controller
class UserDetails extends BaseController {
  //registration
  async userData(req: Request, res: Response, next: NextFunction) {
    try {
      const userExist = await userService.findUserService({
        where: {
          [Op.or]: [{ phone: req.body.phone }, { email: req.body.email }],
        },
      });
      if (userExist) {
        return this.errors(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          "User Already exists"
        );
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      let data = await userService.addUser(req.body);
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

  //login user
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userExits = await userService.findUserService({
        where: { email: req.body.userName },
      });
      let hash: string = userExits.password as string;
      if (userExits) {
        let passMatch = await bcrypt.compare(req.body.password, hash);
        if (passMatch) {
          const token = await generateToken(userExits.customer_id);
          return this.success(
            req,
            res,
            this.status.HTTP_OK,
            token,
            "Login Successfully"
          );
        } else {
          this.errors(
            req,
            res,
            this.status.HTTP_BAD_REQUEST,
            "Password does not Match!"
          );
        }
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
  //find Users
  async findUsersList(req: Request, res: Response, next: NextFunction) {
    try {
      let data: any = await userService.findUsers();
      return this.success(req, res, this.status.HTTP_OK, data, "List of Users");
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, res)
      );
    }
  }
}

export default new UserDetails();
