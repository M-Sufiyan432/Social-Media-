import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { BsPlusSquareDotted } from "react-icons/bs";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";
import { setStoryData } from "../redux/storySlice";
import { setLoopData } from "../redux/loopSlice";
import { ClipLoader } from "react-spinners";

const Upload = () => {
  const [uploadType, setUploadType] = useState("post");
  const [frontenedMedia,setFrontendedMedia] = useState(null)
  const [backenedMedia,setBackenedMedia] = useState(null)
  const [mediaType,setMediaType] = useState("")
  const [caption,setCaption] = useState("");
  const mediaInput = useRef()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {postData} = useSelector(state => state.post)
  const {storyData} = useSelector(state => state.story)
  const {loopData} = useSelector(state => state.loop)
  const [loading ,setLoading] = useState()
 
  const handleMedia = (e)=>{
     const file = e.target.files[0];
     console.log(file);

     if(file.type.includes("image")){
      setMediaType("image")
     }else{
      setMediaType("video")
     }
     setBackenedMedia(file)
     setFrontendedMedia(URL.createObjectURL(file))
  }

  const uploadPost = async()=>{
    try {
      const formData = new FormData();
      formData.append("caption",caption);
      formData.append("mediaType",mediaType);
      formData.append("media",backenedMedia);
      const result = await axios.post(`${serverURL}/api/post/upload`,formData,{withCredentials:true});
      dispatch(setPostData([...postData,result.data]));
      console.log(result);
    setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  const uploadStory = async () => {

  try {
    const formData = new FormData();
    formData.append("mediaType", mediaType);
    formData.append("media", backenedMedia);

    const result = await axios.post(
      `${serverURL}/api/story/upload`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",  // 👈 required
        },
      }
    );
   dispatch(setStoryData([...storyData,result.data]));
    console.log("Story uploaded:", result.data);
     setLoading(false)
      navigate("/")
  } catch (error) {
    console.error("Upload story error:", error.response?.data || error);
  }
};

  const uploadLoop = async()=>{
    try {
      const formData = new FormData();
      formData.append("caption",caption);
      formData.append("media",backenedMedia);
      const result = await axios.post(`${serverURL}/api/loop/upload`,formData,{withCredentials:true});
      dispatch(setLoopData([...loopData,result.data]));
      console.log(result);
       setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpload=async()=>{
    setLoading(true)

    if(uploadType == "post"){
      uploadPost()
    }else if(uploadType == "story"){
      uploadStory()
    }else{
      uploadLoop()
    }
  }





  return (
    <div className="w-full h-[100vh] bg-black flex flex-col  items-center">
      <div className="w-full h-[80px]  flex  items-center gap-[20px] px-[20px]">
        <IoMdArrowRoundBack
          className=" text-white h-[25px] w-[25px] cursor-pointer "
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold ">Upload Media</h1>
      </div>
      <div
        className="w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center
      gap-[10px]" 
      >
        <div
          className={`${
            uploadType == "post"
              ? "bg-black shadow-2xl shadow-black text-white"
              : " "
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black
         rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>

        <div
          className={`${
            uploadType == "story"
              ? "bg-black shadow-2xl shadow-black text-white"
              : " "
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black
         rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>

        <div
          className={`${
            uploadType == "loop"
              ? "bg-black shadow-2xl shadow-black text-white"
              : " "
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black
         rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>
      
      {!frontenedMedia && <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col
      items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
      onClick={()=>mediaInput.current.click()}>
        <input type="file" accept={uploadType=="loop"?"video/*":""} hidden ref={mediaInput} onChange={handleMedia} />
        <BsPlusSquareDotted className='text-white h-[25px] w-[25px] cursor-pointer'/>
        <div className="text-white text-[19px] font-semibold">
          Upload {uploadType}
        </div>
      </div>}  
      {frontenedMedia && 
      <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh] ">

      {mediaType == "image" &&
        <div className="w-[80%] max-w-[550px] h-[250px] flex flex-col items-center justify-center mt-[5vh] ">
          <img src={frontenedMedia} alt="" className="h-[60%] rounded-2xl"/>
          {uploadType != 'story' && <input type="text" className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white 
          mt-[20px]" placeholder="Write Caption" onChange={(e)=>setCaption(e.target.value)} value={caption}/>}
        </div>}

      {mediaType == "video" &&
        <div className="w-[80%] max-w-[550px] h-[250px] flex flex-col items-center justify-center mt-[5vh] ">
          <VideoPlayer media={frontenedMedia}/>
          {uploadType != 'story' && <input type="text" className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white 
          mt-[20px]" placeholder="Write Caption" onChange={(e)=>setCaption(e.target.value)} value={caption}/>}
        </div>}
      </div>}
     {frontenedMedia && <button className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white 
     mt-[50px] cursor-pointer rounded-2xl" onClick={handleUpload}>{loading?<ClipLoader/>:`Upload ${uploadType}`}</button>}
    </div>
  );
};

export default Upload;
