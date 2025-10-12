import { Router } from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { comment, getAllPosts, like, saved, uploadPost } from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/upload",isAuth,upload.single("media"),uploadPost);
postRouter.get("/getAll",isAuth,getAllPosts)
postRouter.get("/saved/:postId",isAuth,saved);
postRouter.get("/like/:postId",isAuth,like);
postRouter.post("/comment/:postId",isAuth,comment)

export default postRouter;