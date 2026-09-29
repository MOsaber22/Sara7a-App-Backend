import userModel from "../../../DB/models/User.model.js";
import { eventEmitter } from "../../../utils/events/confirmEmail.event.js";
import { createHashing } from "../../../utils/security/hashing.js";

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return next(new Error("Email Already Exists", {cause: 409}))
    }

    const hashedPassword = await createHashing({password: password, saltRounds: process.env.SALT_ROUNDS})
    const user = await userModel.create({userName, email, password: hashedPassword});
    
    eventEmitter.emit("user.registered", {email, userName});

    return res.status(201).json({ message: "user created successfully", user });
  } catch (err) {
    if (err?.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => ({
        message: error.message,
        feild: error.path,
      }));
      return res.status(400).json({ message: "validation failed", errors });
    }
    return res.status(500).json({ message: "internal server error", error: err.message });
  }
};
