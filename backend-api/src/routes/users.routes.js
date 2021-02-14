const router = require("express-promise-router")();
const isAuthenticated = require("../middlewares/auth");

const {
  signUp,
  login,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails
} = require("../controllers/users.controller");

router.post("/signup", signUp);

router.post("/login", login);

router.post("/image", isAuthenticated, uploadProfilePhoto);

router.get("/", isAuthenticated, getUserDetail);

router.post("/",isAuthenticated,updateUserDetails);

module.exports = router;
