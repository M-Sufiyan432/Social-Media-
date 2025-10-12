import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : "post",
    initialState:{
        postData : [],
    },
    reducers :{
       setPostData : (state,action)=>{
        console.log("PostData",action.payload);
         state.postData = Array.isArray(action.payload) ? action.payload : [action.payload];
       },
      
    }
})

export const {setPostData} = postSlice.actions;
export default postSlice.reducer