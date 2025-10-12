import React, { useState } from "react";
import db from "../assets/dp.webp";
import VideoPlayer from "./VideoPlayer";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import axios from "axios"
import { setPostData } from "../redux/postSlice";
import { serverURL } from "../App";
import { setUserData } from "../redux/userSlice";
import FollowButton from "./FollowButton";

const Post = ({ post }) => {
  const { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const  [showComment, setShowComment ] = useState(true);
  const [message,setMessage] = useState("")
  const dispatch = useDispatch();
  const handleLike = async()=>{
    try {
      const result = await axios.get(`${serverURL}/api/post/like/${post._id}`,{withCredentials:true})
      const updatedPost = result.data;
      const updatedPosts = postData.map(p=>p._id==post._id?updatedPost:p);
      dispatch(setPostData(updatedPosts))

    } catch (error) {
      console.log(error);
      
    }
  }
  const handleComment = async()=>{
      try {
      const result = await axios.post(`${serverURL}/api/post/comment/${post._id}`,{message},{withCredentials:true})
      const updatedPost = result.data;
      const updatedPosts = postData.map(p=>p._id==post._id?updatedPost:p);
      dispatch(setPostData(updatedPosts))

    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSave = async()=>{
    try {
      const result = await axios.get(`${serverURL}/api/post/saved/${post._id}`,{withCredentials:true})
      dispatch(setUserData(result.data));

    } catch (error) {
      console.log(error.response);
      
    }
  }
  




  return (
    <div
      className="w-[90%] flex flex-col gap-[10px] bg-white items-center shadow-2xl 
    shadow-[#00000058] rounded-2xl pb-[20px]"
    >
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex justify-center items-center gap-[10px] mid:gap-[20px]">
          <div className="mid:w-[60px] mid:h-[60px] w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={post.author?.profileImage || db}
              className="w-full object-cover"
            />
          </div>
          <div className="w-[150px] font-semibold truncate">
            {post.author?.username}
          </div>
        </div>
        {userData._id != post.author._id && <FollowButton tailwind={"px-[10px] w-[60px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-black text-white  rounded-2xl text-[14px] md:text-[16px]"}
        targetUserId={post.author._id}/> }
        

      </div>
      <div className="w-[90%]  flex  items-center justify-center  ">
        {post.mediaType == "image" && (
          <div className="w-[90%]   flex  items-center justify-center  ">
            <img
              src={post?.media}
              alt=""
              className="w-[80%] rounded-2xl  object-cover"
            />
          </div>
        )}

        {post.mediaType == "video" && (
          <div className="w-[80%]  flex flex-col items-center justify-center ">
            <VideoPlayer media={post?.media} />
          </div>
        )}
      </div>
      <div className="w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px">
        <div className="flex justify-center items-center gap-[10px]">
          <div className="flex justify-center items-center gap-[5px]" onClick={handleLike}>
            {!post.likes.includes(userData._id) && (
              <GoHeart className="w-[25px] cursor-pointer h-[25px]" />
            )}
            {post.likes.includes(userData._id) && (
              <GoHeartFill className="w-[25px] cursor-pointer h-[25px] text-red-600" />
            )}
            <span>{post.likes.length}</span>
          </div>
          <div className="flex justify-center items-center gap-[5px]" onClick={()=>setShowComment(prev =>!prev)}>
            <MdOutlineInsertComment className="w-[25px] cursor-pointer h-[25px]" />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div onClick={handleSave}>
          {!userData.saved.includes(post?._id) && (
            <FaRegBookmark className="w-[25px] cursor-pointer h-[25px]" />
          )}
          {userData.saved.includes(post?._id) && (
            <FaBookmark className="w-[25px] cursor-pointer h-[25px]" />
          )}
        </div>
      </div>
      {post.caption && (
        <div className="w-full px-[20px] gap-[10px] flex justify-start items-center">
          <h1>{post.author.username}</h1>
          <div>{post.caption}</div>
        </div>
      )}
      {showComment && 
      <div className="w-full flex flex-col gap-[30px] pb-[20px] ">
        <div className="w-full h-[80px] flex items-center justify-between px-[20px] relative">
        <div className="mid:w-[60px] mid:h-[60px] w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={post.author?.profileImage || db}
              className="w-full object-cover"
            />
          </div>
          <input type="text" className="px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none 
          h-[40px] "placeholder="Write Comment..." onChange={(e)=>setMessage(e.target.value)} value={message} />
          <button className="absolute right-[20px] cursor-pointer" onClick={handleComment}><IoMdSend className="w-[25px] h-[25px]"/></button>
        </div>
        <div className="w-full max-h-[300px] overflow-auto">
         {post.comments?.map((com,indx)=>{
          return <div key={indx} className="w-full px-[20px] py-[20px] flex items-center gap-[20px] border-b-2 border-b-gray-200">
             <div className="mid:w-[60px] mid:h-[60px] w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={com.author.profileImage || db}
              className="w-full object-cover"
            />
          </div>
          <div>{com.message}</div>
          </div>
          
         })}
        </div>
        </div>}
    </div>
  );
};

export default Post;
