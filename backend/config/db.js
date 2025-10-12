import mongoose from "mongoose";

const connectDb = async()=>{
   try {
    await mongoose.connect(process.env.MONGO_DB_URL ||"mongodb://localhost:27017/socialApp");
    console.log("Db is connected");
    
   } catch (error) {
    console.log(error);
   }
}
export default connectDb;