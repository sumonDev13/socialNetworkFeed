import express from "express";
import { verifyToken } from "../middleware/auth-middleware.js";
import { createPost,getPost,getUserPosts,getTimelinePosts,updatePost,likePost,dislikePost,deletePost } from "../controllers/post-controller.js";

const postRouter = express.Router();

postRouter.post('/',verifyToken,createPost);

postRouter.get("/find/:id", getPost)
postRouter.get("/find/userposts/:id", getUserPosts)
postRouter.get('/timelinePosts', verifyToken, getTimelinePosts)

postRouter.put("/updatePost/:id", verifyToken, updatePost)
postRouter.put("/likePost/:postId", verifyToken, likePost)
postRouter.put("/dislikePost/:postId", verifyToken, dislikePost)

postRouter.delete('/deletePost/:id', verifyToken, deletePost)



export default postRouter;