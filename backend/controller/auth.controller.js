import sendMail from "../config/mail.js";
import genToken from "../config/token.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already Exist !" });
    }
    const findUserName = await User.findOne({ username });
    if (findUserName) {
      return res.status(400).json({ message: "Username already Exist !" });
    }
    if (password.lenght < 6) {
      return res
        .status(400)
        .json({ message: "Password Must Be atleast 6 character !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Sign Up Error ${error}` });
  }
};
export const signIn = async (req, res) => {
  try {
    const { password, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User Not found !" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Sign In Error ${error}` });
  }
};
export const signOut = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: " Sign Out Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Sign Out Error ${error}` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 * Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.optExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "Otp is successfully Send" });
  } catch (error) {
    return res.status(500).json({ message: `SendOtp Error ${error}` });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, Otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.resetOtp != Otp || user.optExpires < Date.now()) {
      return res.status(400).json({ message: "invalid/expired otp" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.optExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "otp verified" });
  } catch (error) {
    return res.status(400).json({ message: `verfyidOtp Error ${error}` });
  }
};
export const resetPassword = async (req,res)=>{
    try {
      const {email, password} = req.body;
      console.log("Password",password);
      console.log("email",email);
      
     const user = await User.findOne({ email });
     if(!user || !user.isOtpVerified){
      return res.status(400).json({message:"otp verification required"})
     }
     console.log('User',user);
     
     const hashedPassword = await bcrypt.hash(password,10);
     user.password = hashedPassword;
     user.isOtpVerified = true;
     await user.save();
     return res.status(200).json({message : ' Reset Password Successfully'})
  
    } catch (error) {
    return res.status(400).json({ message: `reset Password Error ${error}` });
      
    }
}