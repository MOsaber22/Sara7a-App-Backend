import { allowedRoles } from "../../middleware/authentication.middleware.js";

export const endPoints = {
    getProfile: [allowedRoles.user],
    updateProfile: [allowedRoles.user, allowedRoles.admin],
    updatePassword: [allowedRoles.user, allowedRoles.admin],
    deactivateAccount: [allowedRoles.user, allowedRoles.admin],
}