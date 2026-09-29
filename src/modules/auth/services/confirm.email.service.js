import userModel from "../../../DB/models/User.model.js";
import { verifyToken } from "../../../utils/security/token.js";

export const confirmEmail = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decoded = verifyToken({authorization, signature: process.env.CONFIRM_EMAIL_SIGNATURE })
    const user = await userModel.findOneAndUpdate(
      { email: decoded.email },
      { confirmEmail: true },
    );
    return res.status(200).json({ message: "confirm email succeeded", user });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error.message });
  }
};
