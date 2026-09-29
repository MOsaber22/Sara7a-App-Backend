import { allowedRoles } from "../../middleware/authentication.middleware.js";

export const endPoints = {
    blockUser: [allowedRoles.admin],
    unBlockUser: [allowedRoles.admin]
}