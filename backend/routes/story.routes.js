import { Router } from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { getStoryByUserName, uploadStory, viewStory } from "../controller/Story.controller.js";

const storyRouter = Router();

storyRouter.post("/upload",isAuth,upload.single("media"),uploadStory);
storyRouter.get("/getByUserName/:username",isAuth,getStoryByUserName)
storyRouter.get("/view/:storyId",isAuth,viewStory);


export default storyRouter;