import userModel from "../../../DB/models/User.model.js";
import { compareHashing } from "../../../utils/security/hashing.js";
import { generateToken } from "../../../utils/security/token.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new Error("invlid login data", { cause: 404 }));
    }
    if (!user.confirmEmail) {
      return next(new Error("confirm your email first", { cause: 403 }));
    }
    const checkPassword = await compareHashing({
      password,
      hashedPassword: user.password,
    });
    if (!checkPassword) {
      return next(new Error("invlid login data", { cause: 404 }));
    }

    const token = generateToken({
      payload: { id: user._id },
      signature: user.role === "Admin" ? process.env.TOKEN_SIGNATURE_ADMIN : process.env.TOKEN_SIGNATURE,
      options: {expiresIn: "1h"}
    });
    return res.status(200).json({ message: "login successfully", token });
  } catch (err) {
    if (err?.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => ({
        message: error.message,
        feild: error.path,
      }));
      return res.status(400).json({ message: "validation failed", errors });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};
