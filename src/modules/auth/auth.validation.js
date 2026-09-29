import joi from "joi";
import { globalFields } from "../../middleware/validation.middleware.js";

export const signup = {
    body: joi.object({
      userName: globalFields.userName.required(),
      email: globalFields.email.required(),
      password: globalFields.password.required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
    }).required(),
  };

export const login = {
    body: joi.object({
      email: globalFields.email.required(),
      password: globalFields.password.required(),
    }).required(),
  };
