import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setSuggestedUser } from "../redux/userSlice"


function useGetSuggestUser (){
const dispatch = useDispatch();
const {userData } = useSelector(state => state.user)

    useEffect(()=>{
        const fetchUser = async()=>{
          try {
        const res = await axios.get(`${serverURL}/api/user/suggested`,{withCredentials:true})
         dispatch(setSuggestedUser(res.data))
        console.log("res",res.data);
       } catch (error) {
        console.log("getSuggestUser Error",error?.message);
       }
    }
      fetchUser();
    },[userData])
}

export default useGetSuggestUser