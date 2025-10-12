import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { MdSlowMotionVideo } from "react-icons/md";
import { BsPlusSquareDotted } from "react-icons/bs";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Nav = () => {
  const navigate = useNavigate();
  const {userData} = useSelector(state => state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px]
    rounded-full shadow-[#000000] z-[100]'>
      <div ><GoHomeFill className='text-white h-[25px] w-[25px] cursor-pointer'onClick={()=>navigate("/")}/></div>
      <div ><FaSearch className='text-white h-[25px] w-[25px] cursor-pointer' /></div>
      <div ><BsPlusSquareDotted className='text-white h-[25px] w-[25px] cursor-pointer' onClick={()=>navigate("/upload")}/></div>
      <div ><MdSlowMotionVideo className='text-white h-[28px] w-[28px] cursor-pointer' /></div>
    <div className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
        <img src={userData.profileImage || dp} className="w-full object-cover" onClick={()=>navigate(`/profile/${userData.username}`)}/>
      </div>
    </div>

  )
}

export default Nav
