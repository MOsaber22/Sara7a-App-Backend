import { transporter } from "../../config/mail.config.js";

export const sendEmail = async ({to, subject, text, html, cc, bcc, replyTo, attachments}) => {
  return await transporter.sendMail({
    from: `"Sara7a" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
    cc,
    bcc,
    replyTo,
    attachments,
  });
};
