import { Router } from "express";
import { getUserProfile } from "./services/getUser.service.js";
import { authenticateMid } from "../../middleware/authentication.middleware.js";
import { authorization } from "../../middleware/authorization.middleware.js";
import { endPoints } from "./accessEndPoints.js";
import { updateProfile } from "./services/updateProfile.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./user.validation.js"
import { updatePassword } from "./services/updatePassword.service.js";
import { deactivateRequest } from "./services/deactivateRequest.service.js";
import { deactivateVerify } from "./services/deactivateVerify.service.js";
import { reativateRequest } from "./services/reativateRequest.service.js";
import { reactivateVerify } from "./services/reativateVerify.service.js";
import { shareProfile } from "./services/shareProfile.service.js";

const router = Router();
router.get('/profile',authenticateMid ,authorization(endPoints.getProfile) ,getUserProfile);
router.get('/profile/:userId',validation(validators.shareProfile), shareProfile)
router.patch('/profile',validation(validators.updateProfile), authenticateMid, authorization(endPoints.updateProfile), updateProfile);
router.patch('/profile/password', validation(validators.updatePassword), authenticateMid,authorization(endPoints.updatePassword), updatePassword);

router.post('/deactivate/request', authenticateMid, authorization(endPoints.deactivateAccount), deactivateRequest);
router.post('/deactivate/verify',validation(validators.deactivationVerify), authenticateMid, authorization(endPoints.deactivateAccount), deactivateVerify);
router.post('/reactivate/request',validation(validators.reactivationRequest), reativateRequest);
router.post('/reactivate/verify',validation(validators.reactivationVerify), reactivateVerify);



export default router;