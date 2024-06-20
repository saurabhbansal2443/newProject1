import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { defaultProfilePicture } from "../costant.js";

let { Schema, model } = mongoose;

let userSchema = new Schema(
  {
    userName: { type: String, required: true },
    profilePicture: { type: String , default : defaultProfilePicture },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      min: [6, "Password is too short "],
    },
    cart: { type: [Number], default: [] },
    address: { type: [String], default: [] },
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

let User = model("User", userSchema);

export default User;
