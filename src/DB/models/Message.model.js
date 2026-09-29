import mongoose, { model, Schema, Types } from "mongoose";

const messageSchema = new Schema({
    message: {
        type: String,
        minLength: 10,
        maxLength: 2000,
        required: true
    },
    recipientId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
})

const messageModel = mongoose.models.Message || model("Message", messageSchema);
export default messageModel;