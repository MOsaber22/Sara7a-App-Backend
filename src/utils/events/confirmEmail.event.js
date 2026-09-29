import { EventEmitter } from "node:events";
import { confirmEmailTemplate } from "../email/template/confirmEmail.template.js";
import { sendEmail } from "../email/send.email.js";
import { generateToken } from "../security/token.js";
import { otpEmailTemplate } from "../email/template/OTP.template.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("user.registered", async ({ email, userName }) => {
  try {
    const confirmToken = generateToken({
      payload: { email },
      signature: process.env.CONFIRM_EMAIL_SIGNATURE,
      optoins: { expiresIn: 15 * 60 },
    });
    const confirmEmailLink = `${process.env.FRONT_URL}/confirm-email/${confirmToken}`;
    const html = confirmEmailTemplate({ userName, confirmEmailLink });
    await sendEmail({ to: email, subject: "Confirm Your Email", html });
  } catch (error) {
    console.error("Confirmation Email Error:", error);
    throw new Error("Error sending confirmation email", {cause: error});
  }
});

eventEmitter.on("deactivation.request", async ({user, otp}) => {
  try {
    const html = otpEmailTemplate({
      userName: user.userName,
      otp,
      purpose: "deactivate your account",
      expireDate: Math.round((user.otp.expiresAt - Date.now()) / 1000 / 60),
    });
    await sendEmail({
      to: user.email,
      subject: "Your Account Deactivation OTP",
      html,
    });
  } catch (error) {
    console.error("Deactivation OTP Email Error:", error);
    
    throw new Error("Error sending confirmation email", {cause: error});
  }
});

eventEmitter.on("reactivation.request", async ({user, otp}) => {
  try {
    const html = otpEmailTemplate({
      userName: user.userName,
      otp,
      purpose: "reactivate your account",
      expireDate: Math.round((user.otp.expiresAt - Date.now()) / 1000 / 60),
    });
    await sendEmail({
      to: user.email,
      subject: "Your Account Reactivation OTP",
      html,
    });
  } catch (error) {
    console.error("Reactivation OTP Email Error:", error);
    throw new Error("Error sending confirmation email:", {cause: error});
  }
});
