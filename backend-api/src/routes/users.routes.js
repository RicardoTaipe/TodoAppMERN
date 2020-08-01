const router = require("express-promise-router")();

const { signUp, login } = require("../controllers/users.controller");

router.post("/signup", signUp);

router.post("/login", login);

//router.post("/profile", profile);

module.exports = router;
