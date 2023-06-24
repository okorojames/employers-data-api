const express = require("express");
const router = express.Router();
const { authController, loginAuth } = require("../controller/authController");
//
router.post("/register-employer", authController);
router.post("/login-employer", loginAuth);

//
module.exports = router;
