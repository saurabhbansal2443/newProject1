import dbConnection from "./DB/index.js";

import express from 'express';
import 'dotenv/config'
import userRouter from "./Routes/users.js"

let server = express();
let port = process.env.PORT || 8080;

dbConnection();
server.use(express.json())
server.use("/" , userRouter);




server.listen(port , ()=>{
    console.log("server is running ")
})