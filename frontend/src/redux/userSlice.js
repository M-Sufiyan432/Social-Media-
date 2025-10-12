import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState:{
        userData : null,
        suggestedUser : null,
        profileData : null,
        following : [],
    },
    reducers :{
       setUserData : (state,action)=>{
        console.log("UserData",action.payload);
        state.userData = action.payload
       },
       setSuggestedUser : (state,action)=>{
        console.log("SuggestUser",action.payload);
        state.suggestedUser = action.payload
       },
       setProfileData : (state,action)=>{
        console.log("setProfileData",action.payload);
        state.profileData = action.payload
       },
       setFollwingData :(state,action)=>{
        console.log("setFollwingData",action.payload);
        state.following = action.payload
       },
       toggleFollow : (state,action)=>{
        const targetUserId = action.payload;
        if(state.following.includes(targetUserId)){
            state.following=state.following.filter(id=>id!=targetUserId);
        }else{
            state.following.push(targetUserId);
        }
       }
    }
})

export const {setUserData,setSuggestedUser,setProfileData,setFollwingData,toggleFollow} = userSlice.actions;
export default userSlice.reducer