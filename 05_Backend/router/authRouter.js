// Setting up the express router
const express = require("express");
const router = express.Router();


// Controller
const authController = require("../controllers/authController")
router.post("/signup", authController.register);
router.post("/signin", authController.login);

module.exports = router;