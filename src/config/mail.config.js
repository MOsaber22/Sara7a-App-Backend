import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const verifyNodeMailerTransporter = async () => {
  try {
    await transporter.verify();
    console.log("connection succeeded, Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed: ", err);
  }
};
