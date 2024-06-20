import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { createUser , updatePicture , userData } from "../Controllers/users.js";

let Router = express.Router();

Router.post("/signup", createUser)
  .get("/userData", userData)
  .patch('/updatePicture' ,upload.single('profilePicture') , updatePicture)

export default Router;
