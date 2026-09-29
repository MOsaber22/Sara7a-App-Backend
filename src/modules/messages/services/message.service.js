import messageModel from "../../../DB/models/Message.model.js";
import userModel from "../../../DB/models/User.model.js";

export const sendMessage = async (req, res, next) => {
    try {
        const {message, recipientId} = req.body;
        const recipient = await userModel.findOne({_id: recipientId, isDeleted: false});
        if (!recipient) {
            return next(new Error("In-valid account", {cause: 404}));
        }
        const newMessage = await messageModel.create({ message, recipientId });
        return res.status(201).json({message: "message is sent successfully", data: newMessage});       
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message, stack: error.stack });
    }
}