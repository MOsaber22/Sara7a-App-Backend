import { sendEmail } from "../../../utils/email/send.email.js";
import { otpEmailTemplate } from "../../../utils/email/template/OTP.template.js";
import { eventEmitter } from "../../../utils/events/confirmEmail.event.js";
import { generateOTP, hashOTP } from "../../../utils/OTP.helper.js";

export const deactivateRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);
    user.otp = {
        hash: hashedOTP,
        expiresAt: Date.now() + 5 * 60 * 1000,
        purpose: "DEACTIVATE_ACCOUNT"
    }
    await user.save();

    eventEmitter.emit("deactivation.request", {user, otp})
    return res.status(200).json({message: "OTP sent successfully"})
  } catch (error) {
    return res.status(500).json({message: "server error", error: error.message})
  }
};
