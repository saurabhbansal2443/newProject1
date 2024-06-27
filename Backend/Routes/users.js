import express from "express";
import upload from "../middlewares/multer.middleware.js";
import auth from "../middlewares/auth.middleware.js"; 
import {
  signup,
  updatePicture,
  userData,
  login,
  logout,
} from "../Controllers/users.js";

let Router = express.Router();

Router.post("/signup", signup)
  .get("/userdata",auth,  userData)
  .patch("/updatePicture", upload.single("profilePicture"), updatePicture)
  .post("/login", login)
  .post("/logout",auth, logout);

export default Router;
