import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { verifyToken } from "../utils/authToken";

export class Authenticate {
  //Authenticate Token
  async authenToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["x-auth"];
      if (!token) {
        return res.status(404).json({
          status: 404,
          message: "provide the valid token",
          data: [],
        });
      }

      //verify Token
      const data = await verifyToken(token);
      let userToken: any;
      if (data)
        userToken = await userService.findUserService({ where: { id: data } });
      if (!data || !userToken)
        return res.status(400).json({
          status: 404,
          message: "Invalid or Expired Token",
          data: [],
        });
      (<any>req).userToken = data;
      return next();
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e.message,
        data: [],
      });
    }
  }
}

export default new Authenticate;