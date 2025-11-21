import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MONGO_DB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // stop the server if DB fails
  }
};

export default connectDb;
