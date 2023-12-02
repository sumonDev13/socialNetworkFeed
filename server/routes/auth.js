import express from "express";
import { login } from "../controllers/auth-controller.js";
import { localVariables,verifyToken } from "../middleware/auth-middleware.js";
import { registerMail } from "../utils/mailer.js";
import { generateOTP,verifyOTP ,createResetSession,resetPassword} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/registerMail", registerMail);
router.get("/generateOTP",verifyToken,localVariables,generateOTP);


router.get("/verifyOTP",verifyToken,verifyOTP)
router.get("/createResetSession",createResetSession);

router.put("/resetPassword",verifyToken,resetPassword);

export default router;
