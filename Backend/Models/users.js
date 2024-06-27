import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { defaultProfilePicture } from "../costant.js";
import jwt from 'jsonwebtoken'

let { Schema, model } = mongoose;

let userSchema = new Schema(
  {
    userName: { type: String, required: true },
    profilePicture: { type: String, default: defaultProfilePicture },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      min: [6, "Password is too short "],
    },
    cart: { type: [Number], default: [] },
    address: { type: [String], default: [] },
    refreshToken: { type: String , default :null }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign({_id : this.id , email : this.email} , process.env.ACCESS_PRIVATE_KEY , {expiresIn : process.env.ACCESS_EXPIRY})
}
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({_id : this.id , email : this.email} , process.env.REFRESH_PRIVATE_KEY , {expiresIn : process.env.REFRESH_EXPIRY})
}

let User = model("User", userSchema);

export default User;
