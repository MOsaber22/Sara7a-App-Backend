import userModel from "../../../DB/models/User.model.js";
import { eventEmitter } from "../../../utils/events/confirmEmail.event.js";
import { generateOTP, hashOTP } from "../../../utils/OTP.helper.js";

export const reativateRequest = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return next(new Error("not registered user", {cause: 404}));
        }
        if (!user.isDeleted) {
            return next(new Error("account is already reactivated", {cause: 400}));
        }
        if (user.isBlocked) {
            return next(new Error("account is blocked by admin", {cause: 403}));
        }

        const otp = generateOTP();
        const hashedOTP = await hashOTP(otp);
        user.otp = {
            hash: hashedOTP,
            expiresAt: Date.now() + 5 * 60 * 1000,
            purpose: "REACTIVATE_ACCOUNT"
        };
        await user.save();
        eventEmitter.emit("reactivation.request", {user, otp});
        return res.status(200).json({message: "OTP sent successfully, check your email"})
    } catch (error) {
        return res.status(500).json({message: "server error", error: error.message})       
    }
}