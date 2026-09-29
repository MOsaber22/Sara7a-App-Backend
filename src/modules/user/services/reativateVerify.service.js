import userModel from "../../../DB/models/User.model.js";
import { verifyOTP } from "../../../utils/OTP.helper.js";

export const reactivateVerify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new Error("not registered user", { cause: 404 }));
    }
    if (!user.isDeleted) {
      return next(new Error("account is already reactivated", { cause: 400 }));
    }
    if (user.isBlocked) {
      return next(new Error("account is blocked by admin", { cause: 403 }));
    }

    if (!user.otp?.hash || !user.otp?.expiresAt || !user.otp?.purpose) {
      return next(new Error("no OTP request found", { cause: 400 }));
    }
    if (user.otp.purpose !== "REACTIVATE_ACCOUNT") {
      return next(new Error("Invalid OTP purpose", { cause: 400 }));
    }
    if (user.otp.expiresAt < Date.now()) {
      return next(new Error("OTP Expired", { cause: 400 }));
    }

    const isValidOTP = await verifyOTP(otp, user.otp.hash);
    if (!isValidOTP) {
        return next(new Error("Invalid OTP", { cause: 400 }));
    }
    user.isDeleted = false;
    user.otp = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Account Reactivated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
