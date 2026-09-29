import userModel from "../../../DB/models/User.model.js";

export const blockUser = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const user = await userModel.findById(userId);
        if (!user) {
            return next(new Error("not registered user", {cause: 404}));
        }
        if (user.isBlocked) {
            return next(new Error("account is blocked by admin", {cause: 403}));
        }
        user.isBlocked = true;
        await user.save();
        return res.status(200).json({message: "User Blocked Successfully", data: user})
    } catch (error) {
        return res.status(500).json({message: "Server Error", error: error.message})
    }
}