import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverURL } from '../App';
import { toggleFollow } from '../redux/userSlice';

const FollowButton = ({targetUserId,tailwind}) => {
  
  const {following} = useSelector(state => state.user);
  const isFollowing = following.includes(targetUserId);
  const dispatch = useDispatch();

  const handleFollow = async()=>{
    try {
      const result = await axios.get(`${serverURL}/api/user/follow/${targetUserId}`,{withCredentials:true})
      console.log(result.data.message);
      
      dispatch(toggleFollow(targetUserId))
    } catch (error) {
      console.log("Handle Follow Error",error);
      
    }
  }

  return (
    <button className={tailwind} onClick={handleFollow}>
      {isFollowing?"Follwing":"Follow"}
    </button>
  )
}

export default FollowButton
