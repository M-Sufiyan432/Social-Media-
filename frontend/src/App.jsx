import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import useGetCurrentUser from "./hook/getCurrentUser.jsx";
import useGetSuggestUser from "./hook/getSuggestedUser.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Upload from "./pages/Upload.jsx";
import useGetAllPost from "./hook/getAllPost.jsx";
export const serverURL = `http://localhost:8000`;
const App = () => {
  useGetCurrentUser();
  useGetSuggestUser();
  useGetAllPost();
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <Signin /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/profile/:username"
        element={userData ? <Profile /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/edit-profile"
        element={userData ? <EditProfile /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default App;
