import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name : "story",
    initialState:{
        storyData : [],
    },
    reducers :{
       setStoryData : (state,action)=>{
        console.log("storyData",action.payload);
      state.postData = Array.isArray(action.payload) ? action.payload : [action.payload];
       },
      
    }
})

export const {setStoryData} = storySlice.actions;
export default storySlice.reducer