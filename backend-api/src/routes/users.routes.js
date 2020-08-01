const router = require("express-promise-router")();

const { signUp, login, uploadProfilePhoto } = require("../controllers/users.controller");

router.post("/signup", signUp);

router.post("/login", login);

router.post("/image", uploadProfilePhoto);

module.exports = router;
