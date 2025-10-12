import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // lowercase works fine
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


const sendMail = async(to,otp)=>{
  transporter.sendMail({
    from : process.env.EMAIL,
    to,
    subject :"Reset Your Password",
    html :` <p>Your otp for password reset is <b>${otp}</b>
    it expires in 5 minuts </p>`
  })
}

export default sendMail;