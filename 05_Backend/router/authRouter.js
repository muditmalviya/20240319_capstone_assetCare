const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * Route for user registration
 * @name POST/signup
 * @function
 * @memberof router
 * @param {string} '/signup' - The endpoint URL for user registration
 * @param {function} authController.register - Controller function for user registration
 */
router.post("/signup", authController.register);

/**
 * Route for user login
 * @name POST/signin
 * @function
 * @memberof router
 * @param {string} '/signin' - The endpoint URL for user login
 * @param {function} authController.login - Controller function for user login
 */
router.post("/signin", authController.login);

module.exports = router;
