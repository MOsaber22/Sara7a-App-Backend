import { Router } from "express";
import { signup } from "./services/signup.service.js";
import { login } from "./services/login.service.js";
import { confirmEmail } from "./services/confirm.email.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./auth.validation.js"
const router = Router();

router.post('/signup', validation(validators.signup), signup)
router.patch('/confirm-email', confirmEmail)
router.post('/login', validation(validators.login), login)

export default router