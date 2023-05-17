import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

//JOI validate
export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  };
};

// userSchema validate
export const userSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .error(
      new Error("Please enter a valid name and atleast minimum 3 letters ")
    ),
  phone: Joi.string()
    .required()
    .min(10)
    .max(10)
    .error(new Error("Please enter a valid phone number")),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required()
    .error(new Error("Please enter a valid Email ID")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .error(new Error("Please enter a valid password")),
});

// productSchema validate
export const productSchema = Joi.object({
  product_name: Joi.string()
    .required()
    .min(3)
    .error(
      new Error("please enter valid productName and atleast minimum 3 letters")
    ),
  brand: Joi.string()
    .required()
    .min(2)
    .error(new Error("please enter valid brand and atleast minimum 2 letters")),
  model: Joi.string()
    .required()
    .max(9999999999)
    .error(new Error("please enter valid model name")),
  category: Joi.string()
    .required()
    .min(3)
    .error(new Error("please enter valid category")),
  price: Joi.number()
    .required()
    .max(9999999999)
    .error(new Error("please enter valid price ")),
  date: Joi.string()
    .required()
    .min(3)
    .error(new Error("please enter the Date")),
  color: Joi.string().required().min(3).error(new Error("please enter color")),
  description: Joi.string()
    .required()
    .error(new Error("please descriped properly")),
});

// cart schema validate
export const cartSchema = Joi.object({
  product_id: Joi.number()
    .required()
    .min(1)
    .error(new Error("please enter ProductID")),
  customer_id: Joi.number()
    .required()
    .min(1)
    .error(new Error("please enter customerID")),
});
