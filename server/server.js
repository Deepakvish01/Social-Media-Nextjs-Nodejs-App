import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors"
import { connectDB } from "./config/db.js";
import postRouter from "./routes/post.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

// SETUP FOR DOTENV
dotenv.config({ path: './config/config.env' });

// MONGODB CONNECTION
connectDB();
 
// SETUP FOR CORS
app.use(cors());

// SETUP FOR BODY-PARSER
app.use(
    bodyParser.json({
        limit: "30mb",
        extended: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));

// SETUP FOR ROUTES
app.use('/posts',postRouter);
app.use('/auth',authRouter);
app.use('/user',userRouter );

// SETUP FOR SERVER
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is Running http://localhost:${port}`.magenta.bold)
});