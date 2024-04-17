const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const jwtHelpers = require('../dependencies/jwtHelpers.js');

/**
 * Route for getting user profile
 * @name GET/profile
 * @function
 * @memberof router
 * @param {string} '/profile' - The endpoint URL for getting user profile
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} userController.getProfile - Controller function for getting user profile
 */
router.get('/profile', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, userController.getProfile);


module.exports = router;
