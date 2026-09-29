
export const otpEmailTemplate = ({ userName, otp, purpose, expireDate }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Verification Code</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          "
        >

          <!-- Header -->
          <div
            style="
              padding: 25px;
              text-align: center;
              background-color: #111827;
              color: #ffffff;
            "
          >
            <h1 style="margin: 0; font-size: 26px;">
              Account Verification
            </h1>
          </div>

          <!-- Content -->
          <div style="padding: 35px 30px; color: #374151;">

            <h2 style="margin-top: 0;">
              Hello ${userName},
            </h2>

            <p style="font-size: 16px; line-height: 1.6;">
              We received a request to ${purpose}.
            </p>

            <p style="font-size: 16px; line-height: 1.6;">
              Please use the following One-Time Password (OTP) to continue:
            </p>

            <!-- OTP -->
            <div
              style="
                margin: 30px 0;
                padding: 20px;
                text-align: center;
                background-color: #f3f4f6;
                border-radius: 10px;
              "
            >
              <span
                style="
                  font-size: 32px;
                  font-weight: bold;
                  letter-spacing: 8px;
                  color: #111827;
                "
              >
                ${otp}
              </span>
            </div>

            <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
              This OTP will expire in <strong>${expireDate} minutes</strong>.
            </p>

            <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
              If you did not request this code, please ignore this email.
              Do not share this OTP with anyone.
            </p>

          </div>

          <!-- Footer -->
          <div
            style="
              padding: 20px;
              text-align: center;
              background-color: #f9fafb;
              color: #9ca3af;
              font-size: 13px;
            "
          >
            <p style="margin: 0;">
              © 2026 Your App. All rights reserved.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
};

