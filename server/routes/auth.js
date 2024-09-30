import express from "express";
import { checkLogin, signin, signup, updatePassword } from "../controllers/auth.js";
import { findUserByEmail, generateOtp, verifyOtp } from "../controllers/user.js";

const authRouter = express.Router();

authRouter.post("/signin",signin);
authRouter.post("/signUp",signup);
authRouter.post("/findUserByEmail",findUserByEmail);
authRouter.post("/generateOtp",generateOtp);
authRouter.post("/verifyOtp",verifyOtp);
authRouter.put("/forgotPassword/:_id",updatePassword);
authRouter.post("/checkLogin",checkLogin);

export default authRouter;