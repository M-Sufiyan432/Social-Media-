import uploadCloudenary from "../config/cloudenary.js";
import Story from "../models/story.model.js";
import User from "../models/users.model.js";

export const uploadStory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    console.log("Req.UserId",req.userId);
    
    if (user.story) {
      await Story.findByIdAndDelete(user.story);
      user.story = null;
    }
    const { mediaType } = req.body;
    let media;
    if (req.file) {
      media = await uploadCloudenary(req.file.path);
    } else {
      return res.status(400).json({ message: "media is required" });
    }
    const story = await Story.create({
      author: req.userId,
      mediaType,
      media,
    });
    user.story = story._id;
    await user.save();
    const populatedStory = await Story.findById(story._id)
      .populate("author", "name username profileImage")
      .populate("viewers", "name username profileImage");
    return res.status(200).json(populatedStory);
  } catch (error) {
    return res.status(500).json({ message: "Story Error ", error });
  }
};
export const viewStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(400).json({ message: "story not found" });
    }
    const viewersIds = story.veiwers.map((id) => id.toString());
    if (!viewersIds.includes(req.userId.toString())) {
      story.veiwers.push(req.userId);
      await story.save();
    }
    const populatedStory = await Story.findById(story._id)
      .populate("author", "name username profileImage")
      .populate("viewers", "name username profileImage");
    return res.status(200).json(populatedStory);
  } catch (error) {
    return res.status(500).json({ message: "Viewers Error ", error });
  }
};


export const getStoryByUserName = async(req,res)=>{
    try {
        const username = req.params.username;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const story = await Story.find({
            author:user._id
        }).populate("viewers author")
        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({message:"story Get by error"})
    }
}
