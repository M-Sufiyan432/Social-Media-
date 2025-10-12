import { Router } from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { comment, getAllLoops, like, uploadLoops } from "../controller/loop.controller.js";

const loopRouter = Router();

loopRouter.post("/upload",isAuth,upload.single("media"),uploadLoops);
loopRouter.get("/getAll",isAuth,getAllLoops)
loopRouter.get("/like/:postId",isAuth,like);
loopRouter.post("/comment",isAuth,comment)

export default loopRouter;