const User = require("../models/user");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const userController = {};

userController.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    return next(createError(401, "The email is already in use"));
  }
  const newUser = new User({ email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  res.json("Your are signed up");
};

userController.login = async (req, res, next) => {
  const { name, email, password } = req.body;
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

userController.uploadProfilePhoto = async (req, res, next)=>{

};
module.exports = userController;
