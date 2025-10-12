import express from "express";
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.post("/sendOtp",sendOtp)
authRouter.post("/verfyOtp",verifyOtp)
authRouter.post("/resetPassoword",resetPassword)
authRouter.get("/signout",signOut)


export default authRouter;