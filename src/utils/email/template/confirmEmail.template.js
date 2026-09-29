export const confirmEmailTemplate = ({userName, confirmEmailLink}) => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #333;">
  <h2 style="color: #222;">Confirm Your Email Address</h2>

  <p>Hi ${userName},</p>

  <p>
    Thank you for creating an account with us!
    Please confirm your email address by clicking the button below.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a
      href="${confirmEmailLink}"
      style="
        background-color: #007bff;
        color: white;
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 6px;
        display: inline-block;
        font-weight: bold;
      "
    >
      Confirm My Email
    </a>
  </div>

  <p>
    If you didn't create this account, you can safely ignore this email.
  </p>

  <p>
    Best regards,<br>
    <strong>Sara7a Team</strong>
  </p>
</div>`;
};
