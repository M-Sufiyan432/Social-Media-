import React, { useEffect, useRef, useState } from 'react'
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import db from "../assets/dp.webp";
import FollowButton from './FollowButton';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineInsertComment } from "react-icons/md";
import axios from 'axios';
import { serverURL } from '../App';
import { setLoopData } from '../redux/loopSlice';
import { IoMdSend } from "react-icons/io";






const LoopCard = ({loop}) => {
    const videoRef = useRef();
    const commentRef = useRef();
    const [isPlaying , setIsPlaying] = useState(true);
    const [IsMute,setIsMute] = useState(true);
    const [progress, setProgress] = useState(0);
    const {userData} = useSelector(state => state.user)
    const {loopData} = useSelector(state => state.loop);
    const [showHeart,setShowHeart] = useState(false);
    const [showComment,setShowComment] = useState(false);
    const [message,setMessage] = useState("")
    const dispatch = useDispatch();

     const handleClick=()=>{
  if(isPlaying){
    videoRef.current.pause();
    setIsPlaying(false);
  }else{
    videoRef.current.play();
    setIsPlaying(true);
  }
  }
  const handleTimeUpdate=()=>{
    const video = videoRef.current;
    if(video){
      const percent = (video.currentTime/video.duration)*100;
      setProgress(percent)
    }
  }
  const handleLike = async()=>{
    try {
      const result = await axios.get(`${serverURL}/api/loop/like/${loop._id}`,{withCredentials:true})
      const updatedLoop = result.data;
      console.log(updatedLoop,"updatedLoop");
      const updatedLoops = loopData.map(p=>p._id==loop._id?updatedLoop:p);
      dispatch(setLoopData(updatedLoops))

    } catch (error) {
      console.log(error);
      
    }
  }
   const handleComment = async()=>{
      try {
      const result = await axios.post(`${serverURL}/api/loop/comment/${post._id}`,{message},{withCredentials:true})
      const updatedLoop = result.data;
      const updatedLoops = loopData.map(p=>p._id==loop._id?updatedLoop:p);
      dispatch(setLoopData(updatedLoops))
    } catch (error) {
      console.log(error);
    }
  }
  const handleDoubleLike= async()=>{
     setShowHeart(true);
     setTimeout(()=>setShowHeart(false),6000);
     {!loop.likes?.includes(userData._id)?handleLike():null};

  }
    

   useEffect(()=>{
    const handleClickOutSide = (event)=>{
      if(commentRef.current && !commentRef.current.contains(event.target)){
        setShowComment(false);
      }
    }
    if(showComment){
      document.addEventListener('mousedown',handleClickOutSide);
    }else{
      document.removeEventListener('mousedown',handleClickOutSide)
    }
   },[showComment]);


    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            const video = videoRef.current;
            // console.log(entry);
            
             if(entry.isIntersecting){
                video.play()
              setIsPlaying(true);
                
             }else{
                video.pause();
               setIsPlaying(false);
             }
        },{threshold:0.6})
        if(videoRef.current){
        observer.observe(videoRef.current);
        }
        return ()=>{
          if(videoRef.current){
            observer.unobserve(videoRef.current);
          }
        }
    },[])
   
  return (
    
    <div className='w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-1-2 border-r-2
     border-l-2  border-gray-800 relative overflow-hidden'>
   {/* DoubleHeart */}
   {showHeart && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50">
    <GoHeartFill className="w-[100px] h-[100px] text-white drop-shadow-2xl" />
  </div>
)}
   {/* ShowComments */}
<div ref={commentRef} className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px] rounded-t-4xl bg-[#0e1718] transform
  transition-transform duration-500 ease-in-out left-0 shadow-2xl shadow-black ${showComment?"translate-y-0":"translate-y-[100%]"} `}>
    <h1 className='text-white text-[20px] text-center font-semibold'>Comments</h1>
    <div className="w-full fixed bottom-0 h-[80px] flex items-center justify-between px-[20px] py-[20px] ">
           <div className="mid:w-[60px] mid:h-[60px] w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
               <img
                 src={loop.author?.profileImage || db}
                 className="w-full object-cover"
               />
             </div>
             <input type="text" className="px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none 
             h-[40px] text-white placeholder:text-white "placeholder="Write Comment..." onChange={(e)=>setMessage(e.target.value)} value={message} />
             <button className="absolute right-[20px] cursor-pointer" onClick={handleComment}><IoMdSend className="w-[25px] h-[25px] text-white"/></button>
           </div>
</div>


      <video ref={videoRef} autoPlay loop muted ={IsMute} src={loop?.media} 
      className='w-full max-h-full' onClick={handleClick} onTimeUpdate={handleTimeUpdate}
      onDoubleClick={handleDoubleLike} />
      {/* Mute */}
      <div className='absolute top-[20px] right-[20px] z-[100]' onClick={()=>setIsMute(prev=>!prev)}>
         {!IsMute ? (
                  <FiVolume2 className="w-[20px] h-[20px] text-white font-semibold" />
                ) : (
                  <FiVolumeX className="w-[20px] h-[20px] text-white font-semibold" />
                )}
      </div>
      {/* progress Bar */}
      <div className='absolute bottom-0 w-full h-[5px] bg-gray-900'>
       <div className='h-full w-[200px] bg-white transition-all duration-200 ease-linear
       ' style={{width:`${progress}%`}}>
         
       </div>
      </div>
      {/* Dp Username */}
      <div className='w-full absolute h-[100px] bottom-[10px] p-[10px] flex flex-col gap-[10px]'>
      <div className="flex  items-center mid:gap-[5px]">
               <div className="mid:w-[40px] mid:h-[40px] w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                 <img
                   src={loop.author?.profileImage || db}
                   className="w-full object-cover"
                 />
               </div>
               <div className="w-[120px] font-semibold truncate text-white">
                 {loop.author?.username}
               </div>
               <FollowButton targetUserId={loop.author._id} tailwind={`px-[10px] py-[5px] text-white
                border-2 text-[14px] rounded-2xl border-white`}/>
             </div>
             {/* caption */}
             <div className='text-white px-[10px]'>
              {loop.caption}
             </div>
       {/* Likes&Comments */}
      <div className='absolute right-0 flex flex-col gap-[20px] text-white bottom-[150px] justify-center
      px-[10px] '>
        {/* Like */}
        <div className='flex flex-col items-center cursor-pointer'>
          <div onClick={handleLike}>
             {!loop.likes.includes(userData._id) && (
              <GoHeart className="w-[25px] cursor-pointer h-[25px]" />
               )}
              {loop.likes.includes(userData._id) && (
              <GoHeartFill className="w-[25px] cursor-pointer h-[25px] text-red-600" />
             )}
          </div>
          <div>{loop.likes.length}</div>
        </div>
        {/* Comments */}
        <div className='flex flex-col items-center cursor-pointer'>
          <div onClick={()=>setShowComment(true)}>
              <MdOutlineInsertComment  className="w-[25px] cursor-pointer h-[25px]"/>
          </div>
          <div>{loop.comments.length}</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LoopCard
