import express from 'express';
import { verifyToken } from '../middleware/auth-middleware.js';
import { getCommentsFromPost,createComment,deleteComment,toggleLike } from '../controllers/comment-controller.js';

const commentRouter = express.Router();

// get all comments from post
commentRouter.get('/:postId', getCommentsFromPost)

// create a comment
commentRouter.post('/', verifyToken, createComment)

// delete a comment
commentRouter.delete('/:commentId', verifyToken, deleteComment)

// like/unlike a comment
commentRouter.put('/toggleLike/:commentId', verifyToken, toggleLike)

export default commentRouter;