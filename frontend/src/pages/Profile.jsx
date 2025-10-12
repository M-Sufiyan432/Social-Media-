import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { serverURL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import db from "../assets/dp.webp";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";

const Profile = () => {
  const { username } = useParams();
  const { profileData, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverURL}/api/user/getProfile/${username}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (error) {
      console.log("Profile Error", error);
    }
  };
  useEffect(() => {
    handleProfile();
  }, [username, dispatch]);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/auth/signout`, {
        withCredentials: true,
      });
      console.log(result.data);
      dispatch(setUserData(null));
    } catch (error) {
      console.log("Handle Log Out Error", error?.message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-white">
        <div
          className="text-white h-[25px] w-[25px] "
          onClick={() => navigate("/")}
        >
          <IoMdArrowRoundBack className="h-[25px] w-[25px] cursor-pointer" />
        </div>
        <div className="font-semibold text-[20px]">{profileData?.username}</div>
        <div
          className="font-semibold cursor-pointer text-[20px] text-blue-500"
          onClick={handleLogOut}
        >
          Log Out{" "}
        </div>
      </div>

      <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[100px] h-[100px] mid:w-[140px] mid:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || db}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-[22px] text-white">
            {profileData?.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>

      <div
        className="w-full h-[100px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center
      text-white"
      >
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts.length}
          </div>
          <div className="text-[18px] md:text-[22px]">Posts</div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {profileData?.followers?.slice(0, 3).map((user, index) => {
                <div
                  className={`w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${index>0?`absolute left-[${index*9}]`:""}` } >
                  <img
                    src={user?.profileImage || db}
                    className="w-full h-full object-cover"
                  />
                </div>;
              })}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.followers?.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px]">Followers</div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              <div
                className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden
               "
              >
                <img
                  src={profileData?.profileImage || db}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute
               left-[9px]"
              >
                <img
                  src={profileData?.profileImage || db}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden
               absolute left-[18px]"
              >
                <img
                  src={profileData?.profileImage || db}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.following?.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px]">Following</div>
        </div>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
        {profileData?._id == userData?._id && (
          <button
            className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        )}
        {profileData?._id != userData?._id && (
          <>
            <FollowButton
              tailwind={
                "px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl"
              }
              targetUserId={profileData?._id}
            />
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl">
              Message
            </button>
          </>
        )}
      </div>
      <div className="w-full min-h-[100vh] flex justify-center">
        <div
          className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white
         relative gap-[20px] pt-[30px]"
        >
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
