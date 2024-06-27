import dbConnection from "./DB/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

import express from 'express';
import 'dotenv/config'
import userRouter from "./Routes/users.js"

let server = express();
let port = process.env.PORT || 8080;

dbConnection();
server.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend domain
  credentials: true // Allow cookies to be sent cross-origin
}));

server.use(express.json())
server.use(cookieParser())



server.use("/" , userRouter);



server.listen(port , ()=>{
    console.log("server is running " , port )
})