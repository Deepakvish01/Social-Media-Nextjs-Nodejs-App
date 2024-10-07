import express from "express";
import { addComments, createPost, deleteComment, deletePost, getPostById, getPosts, likePost, updatePost } from "../controllers/post.js";
import { authenticator } from "../middlewares/authenticatior.js";
const postRouter = express.Router();

postRouter.get("/getPosts", authenticator, getPosts);
postRouter.post("/createPost", authenticator, createPost);
postRouter.put("/updatePost/:_id", authenticator, updatePost);
postRouter.delete("/deletePost/:_id", authenticator, deletePost);
postRouter.get("/getPostById/:_id", authenticator, getPostById);
postRouter.put("/likePost/:_id", authenticator, likePost);
postRouter.put("/addComment/:_id", authenticator, addComments);
postRouter.delete("/deleteComment", authenticator, deleteComment)

export default postRouter;