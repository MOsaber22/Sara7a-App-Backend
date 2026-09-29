import messageModel from "../../../DB/models/Message.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const messages = await messageModel.find({recipientId: user._id}).populate([
      {
        path:"recipientId",
        select: "userName email"
      }
    ])
    const userWithMessages = user.toObject();
    userWithMessages.messages = messages;
    return res.status(200).json({ message: "user profile", user: userWithMessages });
  } catch (error) {
    return res.status(500).json({ message: "error", error });
  }
};
