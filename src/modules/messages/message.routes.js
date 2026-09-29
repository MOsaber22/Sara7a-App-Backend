import { Router } from "express";
import { sendMessage } from "./services/message.service.js";

const router = Router();

router.post('/send-message', sendMessage);

export default router;