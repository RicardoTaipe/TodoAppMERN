const User = require("../models/user");
const passport = require("passport");

const userController = {};

userController.signUp = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0) {
    errors.push({ msg: "Please enter a name" });
  }
  if (password !== confirm_password) {
    errors.push({ msg: "Password do not match" });
  }
  if (password.length < 4) {
    errors.push({ msg: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The email is already in use");
      res.redirect("/users/signup");
    }
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "Your are signed up");
    res.redirect("/users/signin");
  }
};

userController.login = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

module.exports = userController;
