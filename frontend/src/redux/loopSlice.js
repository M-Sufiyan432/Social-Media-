import { createSlice } from "@reduxjs/toolkit";

const loopSlice = createSlice({
    name : "loo[",
    initialState:{
        loopData : [],
    },
    reducers :{
       setLoopData : (state,action)=>{
        console.log("LoopData",action.payload);
         state.postData = Array.isArray(action.payload) ? action.payload : [action.payload];
       },
      
    }
})

export const {setLoopData} = loopSlice.actions;
export default loopSlice.reducer