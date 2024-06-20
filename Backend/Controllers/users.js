import User from "../Models/users.js";
import uploadOnCloudinary from "../utils/cloudnary.js";
import { defaultProfilePicture } from "../costant.js";


let createUser = async (req, res) => {
  let { email } = req.body;

  try {
    //Checking if the user exists or not
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    // Creating a new user
    let newUser = new User(req.body);
    await newUser.save();
    return res.json({ message: "user is created " });
  } catch (err) {
    res.send({ message: "Server error", error: err.message });
  }
};

let updatePicture = async (req, res) => {
  
  let { email } = req.body;
  let filePath =  req.file?.path;
  console.log("filePath", filePath);
  try {
    let profilePictureUrl = await uploadOnCloudinary(filePath);
    let updatedUser  = await User.findOneAndUpdate(
      { email: email },
      { profilePicture: profilePictureUrl.url || defaultProfilePicture },
      { new : true }
    );

    res.send({ message: "file uplaoded succesfully", result: updatedUser });
  } catch (err) {
    res.send({ message: "Server error", error: err.message });
  }
};

let userData = async (req, res) => {
  try {
    let { id } = req.body;
    let data = await User.findOneById(id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

export { createUser, updatePicture , userData};
