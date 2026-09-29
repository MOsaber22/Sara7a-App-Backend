import jwt from "jsonwebtoken";
import userModel from "../DB/models/User.model.js";
import { verifyToken } from "../utils/security/token.js";

export const allowedRoles = {
  admin: "Admin",
  user: "User"
}

export const authenticateMid = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization?.split(" ") || [];
    if (!bearer || !token) {
        return next(new Error("missing token components", {cause: 401}))
    }
    let signature = undefined;
    switch (bearer) {
        case "Admin":
            signature = process.env.TOKEN_SIGNATURE_ADMIN;
            break;
        case "Bearer":
            signature = process.env.TOKEN_SIGNATURE;
            break;
        default:
            return next(new Error("invalid token type", {cause: 401}))
    }
    const decoded = verifyToken({token, signature});
    if (!decoded?.id) {
      return next(new Error("invalid token", {cause: 401}))
    }
    
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(new Error("not registered user", {cause: 404}))
    }
    
    if (user.updatePasswordTime?.getTime() >= decoded.iat * 1000) {
      return next(new Error("invalid credentials, login again", {cause: 400}))
    }
    if (user.isDeleted) {
      return next(new Error("account is deleted, reactivated first", {cause: 404}))
    }
    if (user.isBlocked) {
      return next(new Error("account is Blocked by admin", {cause: 403}))
    }
    req.user = user;
    next();
  } catch (error) {
    if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
      return res.status(400).json({ message: "invalid token" });
    }
    return res.status(500).json({ message: "error", error });
  }
};
