import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    const token = await jwt.sign(
      { userId },
      process.env.JWT_SECRET || "This is JWT Secret",
      { expiresIn: "10y" }
    );
    return token
  } catch (error) {
    console.log("genToken Error : ",error);
    
  }
};
export default genToken;
