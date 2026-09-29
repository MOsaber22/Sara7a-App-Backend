import userModel from "../../../DB/models/User.model.js";
import {
  compareHashing,
  createHashing,
} from "../../../utils/security/hashing.js";

export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;
    const checkOldPassword = await compareHashing({
      password: oldPassword,
      hashedPassword: req.user.password,
    });
    if (!checkOldPassword) {
      return next(new Error("not valid old password"), { cause: 409 });
    }
    const hashedPassword = await createHashing({ password });
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        password: hashedPassword,
        updatePasswordTime: Date.now(),
      },
      { returnDocument: "after", runValidators: true },
    );
    return res
      .status(200)
      .json({ message: "password updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "server error" , error: error.message });
  }
};
