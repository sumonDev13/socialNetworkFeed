import express from "express";
import {
  getUser,
} from "../controllers/users-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);


export default router;
