import express from "express";
import { getAll,getUser,getUserFriends,updateUser,followUser,unfollowUser,deleteUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.get('/findAll', getAll)
userRouter.get('/find/:id', getUser)
userRouter.get('/find/userfriends/:id', getUserFriends)

userRouter.put('/update/:id', verifyToken, updateUser)
userRouter.put("/follow/:id", verifyToken, followUser)
userRouter.put('/unfollow/:id', verifyToken, unfollowUser)

userRouter.delete('/delete/:id', verifyToken, deleteUser)


export default userRouter;
