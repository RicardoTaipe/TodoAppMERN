const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs-extra");
const createError = require("http-errors");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signUp = async (req, res, next) => {
  const { email, password, name, username } = req.body;
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    return next(createError(401, "The email is already in use"));
  }
  const newUser = new User({ email, password, name, username });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.JWT_KEY
  );
  res.status(200).json({
    message: "Welcome",
    token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(createError(401, "No user found"));
  }
  const match = await user.matchPassword(password);
  if (!match) {
    return next(createError(403, "Login failed"));
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_KEY
  );
  res.status(200).json({
    message: "Authentication succesful",
    token: token,
    uid: user._id,
  });
};

const uploadProfilePhoto = async (req, res, next) => {
  console.log(req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  await User.updateOne(
    { _id: req.userData.userId },
    { imageURL: result.secure_url }
  );
  await fs.unlink(req.file.path);
  res.status(200).json("Image uploaded succesfully");
};

const getUserDetail = async (req, res, next) => {
  const result = await User.findOne({ _id: req.userData.userId });
  res.status(200).json(result);
};

const updateUserDetails = async (req, res, next) => {
  const result = await User.findOneAndUpdate(
    { _id: req.userData.userId },
    req.body
  );
  res.status(200).json({ message: "Updated successfully" });
};

module.exports = { signUp, login, uploadProfilePhoto, getUserDetail, updateUserDetails };
