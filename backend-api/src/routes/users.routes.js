const { Router } = require("express");
const router = Router();

const { signUp, login } = require("../controllers/users.controller");

router.post("/signup", signUp);

router.post("/login", login);

//router.post("/profile", profile);

module.exports = router;
