import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors"
import postRouter from "./routes/post.routes.js";
import loopRouter from "./routes/loop.routes.js";
import storyRouter from "./routes/story.routes.js";

const app = express();
const PORT = 8000;

app.use(cors({
  origin:`http://localhost:5173`,
  credentials:true,
}))


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/loop",loopRouter)
app.use("/api/story",storyRouter)




app.get("/", (req, res) => {
  res.send("This will work");
});

app.listen(PORT, () => {
  connectDb();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
