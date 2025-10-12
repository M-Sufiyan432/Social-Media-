import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { PrefetchPageLinks, useNavigate } from "react-router";
import db from "../assets/dp.webp";
import axios from "axios";
import { serverURL } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const imageInput = useRef();
  const [frontendImage, setFrontendImage] = useState(
    userData?.profileImage || db
  );
  const [backenedImage, setBackenedImage] = useState(null);
  const [name, setName] = useState(userData.name || "");
  const [username, setUsername] = useState(userData.username || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profession, setProfession] = useState(userData.profession || "");
  const [gender, setGender] = useState(userData.gender || "");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    try {
      const file = e.target.files[0];
      setBackenedImage(file);
      setFrontendImage(URL.createObjectURL(file));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);

      formData.append("username", username);

      formData.append("bio", bio);

      formData.append("profession", profession);

      formData.append("gender", gender);
      console.log(gender);

      if (backenedImage) {
        formData.append("profileImage", backenedImage);
      }
      const res = await axios.post(
        `${serverURL}/api/user/editProfile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Res", res.data);

      setLoading(false);
      dispatch(setProfileData(res.data));
      dispatch(setUserData(res.data));
      navigate(`/profile/${userData.username}`);
    } catch (error) {
      setLoading(false);
      console.log(
  "Handle Profile Image Error",
  error.response?.data || error.message
);
    }
  };
  return (
    <div
      className="w-full min-h-[100vh] bg-black flex items-center flex-col 
    gap-[20px] "
    >
      <div className="w-full h-[80px]  flex  items-center gap-[20px] px-[20px]">
        <IoMdArrowRoundBack
          className=" text-white h-[25px] w-[25px] cursor-pointer "
          onClick={() => navigate(`/profile/${userData.username}`)}
        />
        <h1 className="text-white text-[20px] font-semibold ">Edit Profile</h1>
      </div>
      <div
        className="w-[100px] h-[100px] mid:w-[100px] mid:h-[100px] border-2 border-black
      mt-[60px] rounded-full cursor-pointer overflow-hidden "
        onClick={() => imageInput.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img src={frontendImage} className="w-full h-full object-cover" />
      </div>
      <div
        className="text-blue-500 text-center text-[18px] font-semibold"
        onClick={() => imageInput.current.click()}
      >
        Change Your Profile Picture
      </div>
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
      rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
      rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Enter Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
      rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
      rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Profession"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
      rounded-2xl text-white font-semibold px-[20px] outline-none "
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <button
        className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] cursor-pointer rounded-2xl"
        onClick={handleEditProfile}
      >
        {loading ? <ClipLoader size={30} color="black" /> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;
