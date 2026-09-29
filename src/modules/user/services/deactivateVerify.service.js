import { verifyOTP } from "../../../utils/OTP.helper.js";

export const deactivateVerify = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const user = req.user;
    // check on user's otp first
    if (!user.otp?.hash || !user.otp?.expiresAt || !user.otp?.purpose) {
        return next(new Error("no OTP request found", { cause: 400 }));
    }
    if (user.otp.purpose !== "DEACTIVATE_ACCOUNT"){
        return next(new Error("Invalid OTP purpose", { cause: 400 }));
    }
    if (user.otp.expiresAt < Date.now()){
        return next(new Error("OTP Expired", { cause: 400 }));
    }

    const checkOTP = await verifyOTP(otp, user.otp.hash);
    if (!checkOTP){
        return next(new Error("not valid OTP", { cause: 400 }));      
    }

    user.isDeleted = true;
    user.otp = undefined;
    await user.save()
    return res.status(200).json({ message: "account deleted successfully"});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
