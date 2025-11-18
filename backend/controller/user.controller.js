import uploadCloudenary from "../config/cloudenary.js";
import User from "../models/users.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("posts loops posts.author posts.comments saved saved.author");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `UserController error : ${error}` });
  }
};
export const getSuggestedUser = async (req,res)=>{
   try {
    const users = await User.find({
      _id : {$ne:req.userId}
    }).select("-password")
    return res.status(200).json(users)
   } catch (error) {
    return res.status(500).json({message:`suggested User errorr : ${error}`})
    
   }
}
export const editProfile = async(req,res)=>{
   try {
    const {name,username,bio,profession,gender} = req.body;
    const user = await User.findById(req.userId).select("-password")
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    const sameUserName = await User.findOne({username}).select("-password")
    if(sameUserName &&  user.id != req.userId){
      return res.status(400).json({message:"username already Taken"})
    }
    let profileImage ;
    if(req.file){
      profileImage= await uploadCloudenary(req.file.path)
    }
    user.name = name;
    user.username = username;
    if(profileImage){
    user.profileImage = profileImage;
    }
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
     await user.save();
     return res.status(200).json(user)
   } catch (error) {
    return res.status(400).json({message:"Edit Profile Error : ",error})
   }
}
export const getProfile = async (req,res)=>{
   try {
    const username = req.params.username;
    const user = await User.findOne({username}).select("-password").populate("posts loops followers following")
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
   } catch (error) {
      return res.status(400).json({message:"get Profile Error ",error})
    
   }
}
export const follow = async(req,res)=>{
  try {
     const currentUserId = req.userId;
   const targetedUserId = req.params.targetUserId;

   if(!targetedUserId){
    return res.status(400).json({message:"target user is not found"})
   }

   if(currentUserId == targetedUserId){
    return res.status(400).json({message:"You can follow your Self"})
   }
   const currentUser = await User.findById(currentUserId);
   const targetUser = await User.findById(targetedUserId);

   const isFollow = currentUser.following.includes(targetedUserId);

   if(isFollow){
    currentUser.following = currentUser.following.filter(id=>id.toString() != targetedUserId)
    targetUser.followers = targetUser.followers.filter(id=>id.toString() != currentUserId);
    await currentUser.save();
    await targetUser.save();
    return res.status(200).json({
      following:false,
      message:"unfollow Successfully"
    })
   }else{
    currentUser.following.push(targetedUserId);
    targetUser.followers.push(currentUserId);
    await currentUser.save();
    await targetUser.save();
    return res.status(200).json({
      following:true,
      message:"follow Successfully"
    })

   }
  } catch (error) {
      return res.status(400).json({message:"Follow Error ",error})
  }
}