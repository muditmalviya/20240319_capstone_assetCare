/**
 * Express module for handling HTTP requests
 * @const
 */
const express = require("express");

/**
 * Express router for defining API routes
 * @type {object}
 * @namespace router
 */
const router = express.Router();

/**
 * Controller module for authentication-related functionalities
 * @const
 */
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

/**
 * Route for requesting a password reset
 * @name POST/forget-password
 * @function
 * @memberof router
 * @param {string} '/forget-password' - The endpoint URL for requesting a password reset
 * @param {function} authController.forgetPassword - Controller function for requesting a password reset
 */
router.post("/forget-password", authController.forgetPassword);

/**
 * Route for resetting password
 * @name PUT/reset-password
 * @function
 * @memberof router
 * @param {string} '/reset-password' - The endpoint URL for resetting password
 * @param {function} authController.resetpassword - Controller function for resetting password
 */
router.put("/reset-password", authController.resetpassword);

/**
 * Module exports the router
 * @module
 */
module.exports = router;
