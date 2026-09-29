import crypto from "crypto";
import bcrypt from "bcrypt";

export const generateOTP = () => {
    const otp = crypto.randomInt(1000, 10000).toString();
    return otp;
}

export const hashOTP = async (otp) => {
    return await bcrypt.hash(otp, 10);
}

export const verifyOTP = async (otp, hashedOTP) => {
    return await bcrypt.compare(otp, hashedOTP);
}