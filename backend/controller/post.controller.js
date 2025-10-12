import uploadCloudenary from "../config/cloudenary.js";
import Post from "../models/post.model.js";
import User from "../models/users.model.js";

export const uploadPost = async(req,res)=>{
    try {
        const {caption,mediaType} = req.body;
    let media;
    if(req.file){
        media = await uploadCloudenary(req.file.path);
    }else{
        return res.status(400).json({message:"media is required"})
    }
    const post = await Post.create({
      caption,media,mediaType,author:req.userId
    })
    const user = await User.findById(req.userId)
    user.posts.push(post._id);
    await user.save()
     const populatedPost = await Post.findById(post._id).populate("author",
        "name username profileImage"
    )
    return res.status(201).json(populatedPost);
    } catch (error) {
        return res.status(500).json({message:`uploadPost Error ${error}`})
    }
    
}


export const getAllPosts = async(req,res)=>{
  try {
    const posts  = await Post.find({}).populate("author","name username profileImage").populate("comments.author","name username profileImage").sort({createdAt:-1})
    return res.status(200).json(posts)
  } catch (error) {
        return res.status(500).json({message:`getAllPosts Error ${error}`})
  }
}
export const like = async(req,res)=>{
   try {
    const postId = req.params.postId;
    // console.log("Post Id",postId)
    const post = await Post.findById(postId)
    if(!post){
        return res.status(400).json({message:"Post not found"})
    }
    const alreadyLiked = post.likes.some(id=>id.toString()==req.userId.toString());
    if(alreadyLiked){
        post.likes = post.likes.filter(id=>id.toString() != req.userId.toString())
    }else{
        post.likes.push(req.userId)
    }
    await post.save();
    await post.populate("author","name username profileImage")
    return res.status(200).json(post)

   } catch (error) {
        return res.status(500).json({message:`Like Error ${error}`})
    
   }
}
export const comment = async(req,res)=>{
    try {
        const {message} = req.body;
        const postId = req.params.postId;
        const post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message:"Post not found"})
        }
        post.comments.push({
            author:req.userId,
            message
        })
        await post.save();
    await post.populate("author","name username profileImage")
     await post.populate("comments.author")
    return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message:`CommentsPost Error ${error}`})
        
    }
}
export const saved = async(req,res)=>{
     try {
    const postId = req.params.postId;
    const user = await User.findById(req.userId)

    const alreadySaved = user.saved.some(id=>id.toString()==postId.toString());
    if(alreadySaved){
       user.saved = user.saved.filter(id=>id.toString() != postId.toString())
    }else{
        user.saved.push(postId)
    }
    await user.save();
    user.populate("saved")
    return res.status(200).json(user)

   } catch (error) {
        return res.status(500).json({message:`Saved Error ${error}`})
    
   }
}