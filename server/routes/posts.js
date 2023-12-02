import express from "express";
import { getFeedPosts, getUserPosts, likePost ,deletePost} from "../controllers/post-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.delete("/deletePost/:_id", verifyToken, deletePost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;