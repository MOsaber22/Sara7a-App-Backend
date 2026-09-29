import mongoose, { model, Schema } from "mongoose";
import { allowedRoles } from "../../middleware/authentication.middleware.js";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username Is Required"],
      trim: true,
      minLength: [3, "Minimum Length Is 3 Characters"],
      maxLength: [50, "Maximum Length Is 50 Characters"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      trim: true,
      unique: [true, "Email Already Exists"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Gender Must Be male or female Only",
      },
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: Object.values(allowedRoles),
      default: allowedRoles.user,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      // match:
    },
    address: {
      country: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
    },
    DOB: {
        type: Date
    },
    updatePasswordTime: {
        type: Date
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    otp: {
      hash: String,
      expiresAt: Number,
      purpose: String
    }
  },
  { timestamps: true },
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
