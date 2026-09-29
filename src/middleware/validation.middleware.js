import joi from "joi"
import { Types } from "mongoose";

const validateID = (value, helper) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("In-valid ObjectId");
}
export const globalFields = {
  userName: joi.string().min(3).max(25).alphanum(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
    "string.email": "not valid email"
  }),
  password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  phone: joi.string().pattern(/^(?:\+20|0)?1[0125]\d{8}$/),
  otp: joi.string().pattern(/^\d{4}$/),
  id: joi.string().custom(validateID)
}

export const validation = (schemas) => {
  return (req, res, next) => {
    for (const [key, schema] of Object.entries(schemas)) {
      const {error} = schema.validate(req[key], {abortEarly: false});
      if (error) {
        return res.status(400).json({message: "validation error", errors: error.details})
      }
    }
    return next()
  };
};
