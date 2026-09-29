import userModel from "../../../DB/models/User.model.js";

export const updateProfile = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    return res.status(200).json({ message: "profile updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({message: "server error"})
  }
};
