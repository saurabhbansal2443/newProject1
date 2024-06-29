import User from "../Models/users.js";
import uploadOnCloudinary from "../utils/cloudnary.js";
import { defaultProfilePicture } from "../costant.js";

const generateToken = async (user) => {
  let accessToken = await user.generateAccessToken();
  let refreshToken = await user.generateRefreshToken();
  return { accessToken, refreshToken };
};

let signup = async (req, res) => {
  console.log("Signup called ")
  let { email } = req.body;

  try {
    //Checking if the user exists or not
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ res: false, message: "User already exists" });
    }
    // Creating a new user
    let newUser = new User(req.body);
    let { accessToken, refreshToken } = await generateToken(newUser); // generating tokens
    newUser.refreshToken = refreshToken; // storing tokens in database
    await newUser.save();

    const option = { httpOnly: true, secure: true , sameSite: 'None',}; // this is done so that from frontend user cannot chnage the cookie

    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json({
        res: true,
        message: "user is created ",
        user: newUser,
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
  } catch (err) {
    res.send({ res: false, message: "Server error", error: err.message });
  }
};

let login = async (req, res) => {
  console.log("login called " , req.body)
  let { email, password } = req.body;

  try {
    //Checking if the user exists or not
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (!existingUser) {
      return res.json({ message: "User not  exists" });
    }

    let result = await existingUser.isPasswordCorrect(password);
   
    if (result  ) {
      let { accessToken, refreshToken } = await generateToken(existingUser); // generating tokens
      existingUser.refreshToken = refreshToken;
      await existingUser.save();
      const option = { httpOnly: true, secure: true,  sameSite: 'None', }; // this is done so that from frontend user cannot chnage the cookie

      return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json({
          res: true,
          message: "user loggedIn  ",
          data : existingUser
        });
    } else {
      res.send({ res: false, message: "Password Incorrect " });
    }
  } catch (err) {
    res.send({ res: false, message: "Server error", error: err.message });
  }
};

let updatePicture = async (req, res) => {
  let { email } = req.body;
  let filePath = req.file?.path;
  console.log("filePath", filePath);
  try {
    let profilePictureUrl = await uploadOnCloudinary(filePath);
    let updatedUser = await User.findOneAndUpdate(
      { email: email },
      { profilePicture: profilePictureUrl.url || defaultProfilePicture },
      { new: true }
    );

    res.send({
      res: true,
      message: "file uplaoded succesfully",
      result: updatedUser,
    });
  } catch (err) {
    res.send({ res: false, message: "Server error", error: err.message });
  }
};

let userData = async (req, res) => {
  try {
   const user = req.user ;
   res.status(201).send({res: true ,message: "Userfound" ,  data : user });
  } catch (err) {
    res.send(err);
  }
};

let logout = async (req, res) => {
  if (!req.user) return res.send({ res: false, message: "Please login " });

  try {
    const user = req.user;
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: null },
      { new: true }
    );

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .send({
        res: true,
        message: "Logged out successfully",
        data: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .send({ res: false, message: "Logout failed", error: error.message });
  }
};

export { signup, updatePicture, userData, login, logout };
