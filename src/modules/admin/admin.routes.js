import { Router } from "express";
import { blockUser } from "./services/blockUser.service.js";
import { unBlockUser } from "./services/unBlockUser.service.js";
import { authenticateMid } from "../../middleware/authentication.middleware.js";
import { authorization } from "../../middleware/authorization.middleware.js";
import { endPoints } from "./accessEndPoints.js";

const router = Router();
router.patch('/users/:userId/block-user',authenticateMid, authorization(endPoints.blockUser), blockUser);
router.patch('/users/:userId/unblock-user',authenticateMid,authorization(endPoints.unBlockUser), unBlockUser);

export default router;