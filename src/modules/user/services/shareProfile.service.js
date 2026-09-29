import userModel from "../../../DB/models/User.model.js";

export const shareProfile = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const user = await userModel.findOne({_id: userId, isDeleted: false}).select("userName email");
        return res.status(200).json({message: "shere profile", user})       
    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
}