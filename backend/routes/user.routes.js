import { Router } from "express";
import isAuth from "../middleware/isAuth.js";
import { editProfile, follow, getCurrentUser, getProfile, getSuggestedUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";

const userRouter = Router();

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.get("/suggested",isAuth,getSuggestedUser)
userRouter.get("/getProfile/:username",isAuth,getProfile)
userRouter.get("/follow/:targetUserId",isAuth,follow)
userRouter.post("/editProfile",isAuth,upload.single("profileImage"),editProfile)

export default userRouter;