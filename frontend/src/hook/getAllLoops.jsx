import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setLoopData } from "../redux/loopSlice"

function useGetAllLoops (){
const dispatch = useDispatch();
const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchAllLoop = async()=>{
          try {
        const res = await axios.get(`${serverURL}/api/loop/getAll`,{withCredentials:true})
         dispatch(setLoopData(res.data))
        console.log("res",res.data);
       } catch (error) {
        console.log("getAll Loop  Error",error);
       }
    }
      fetchAllLoop();
    },[userData,dispatch])
}

export default useGetAllLoops