import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
import { setPostData } from "../redux/postSlice"

function useGetAllPost (){
const dispatch = useDispatch();
const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchPost = async()=>{
          try {
        const res = await axios.get(`${serverURL}/api/post/getAll`,{withCredentials:true})
         dispatch(setPostData(res.data))
        console.log("res",res.data);
       } catch (error) {
        console.log("getAll Post  Error",error);
       }
    }
      fetchPost();
    },[userData,dispatch])
}

export default useGetAllPost