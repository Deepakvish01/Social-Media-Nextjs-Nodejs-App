import express from "express";
import { getUserById, acceptFriendRequest, sendFriendRequest, updateUser, getAllUsers, requestsReceived, removeRequest, getAllFriends, deleteFriend, deleteUser, removeDP, searchFriends } from "../controllers/user.js";
import { authenticator } from "../middlewares/authenticatior.js";

const userRouter = express.Router();

userRouter.get("/getAllUsers", authenticator, getAllUsers);
userRouter.get("/getAllReceivedRequest", authenticator, requestsReceived);
userRouter.get("/getUserById/:_id", authenticator, getUserById);
userRouter.put("/removeDP",authenticator, removeDP);
userRouter.get("/getAllFriends", authenticator, getAllFriends);
userRouter.get("/searchFriend",authenticator,searchFriends);
userRouter.put("/updateUserById/:_id", authenticator, updateUser);
userRouter.put("/sendFriendRequest/:_id", authenticator, sendFriendRequest);
userRouter.put("/acceptFriendRequest/:_id", authenticator, acceptFriendRequest);
userRouter.put("/removeRequest/:_id", authenticator, removeRequest);
userRouter.put("/deleteFriend/:_id", authenticator, deleteFriend)
userRouter.put("/deleteUser/:_id",authenticator, deleteUser)

export default userRouter;