const express = require("express");
const router = express.Router();
const {
  loginAuth,
  registerController,
} = require("../controller/authController");
//
router.post("/register-employer", registerController);
router.post("/login-employer", loginAuth);

//
module.exports = router;
