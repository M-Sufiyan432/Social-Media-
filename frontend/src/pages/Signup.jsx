import { useState } from "react";
import logo2 from "../assets/logo2.png";
import logo1 from "../assets/logo.png";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { serverURL } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Signup = () => {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [ err,setErr ]= useState('')
  const navigate = useNavigate()

  const handleSignUp = async () => {
    setErr("")
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/signup`,
        { name, password, email, username },
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(res.data))
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message)
      console.log("Handle Sign Up error in Frontened :", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-gradient-to-b from-black
     to-gray-900 flex flex-col justify-center items-center"
    >
      <div
        className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center
      overflow-hidden border-2 border-[#1a1f23] "
      >
        <div
          id="1"
          className="w-full lg:w-[50%] h-full bg-white flex flex-col 
      items-center p-[10px] gap-[20px]"
        >
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign up to </span>
            <img src={logo2} className="w-[70px]" />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
        border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}
          >
            <label
              htmlFor="name"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
            ${inputClicked.name ? "top-[-15px]" : ""}`}
            >
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl 
        border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, username: true })}
          >
            <label
              htmlFor="username"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
            ${inputClicked.username ? "top-[-15px]" : ""}`}
            >
              Enter Your Username
            </label>
            <input
              type="text"
              id="username"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl 
        border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
            ${inputClicked.email ? "top-[-15px]" : ""}`}
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  
        border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]
            ${inputClicked.password ? "top-[-15px]" : ""}`}
            >
              Enter Your Password
            </label>
            <input
              type={showPass ? `text` : `password`}
              id="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {!showPass ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPass(true)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPass(false)}
              />
            )}
          </div>
          {err && <p className="text-red-600">{err}</p>}
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] 
        cursor-pointer rounded-2xl mt-[30px] "
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : `Sign Up`}
          </button>
          <p className="cursor-pointer text-gray-800">
            Already Have an account ?{" "}
            <span className="border-b-2   border-b-black pb-[3px] text-black " onClick={()=>navigate("/signin")}>
              Sign In
            </span>
          </p>
        </div>
        <div
          id="2"
          className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000]
      flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px]
      shadow-2xl shadow-black"
        >
          <img src={logo1} className="w-[40%]" />
          <p>Not Just A Platforn, It's A VYBE</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
