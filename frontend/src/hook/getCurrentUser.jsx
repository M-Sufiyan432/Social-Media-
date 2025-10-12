import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../App"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

function useGetCurrentUser (){
const dispatch = useDispatch();
    useEffect(()=>{
        const fetchUser = async()=>{
          try {
        const res = await axios.get(`${serverURL}/api/user/current`,{withCredentials:true})
         dispatch(setUserData(res.data))
        console.log("res",res.data);
       } catch (error) {
        console.log("getCurrentUser Error",error);
       }
    }
      fetchUser();
    },[])
}

export default useGetCurrentUser;