/**
 * Express module for handling HTTP requests
 * @const
 */
const express = require('express');

/**
 * Express router for defining API routes
 * @type {object}
 * @namespace router
 */
const router = express.Router();

/**
 * Controller module for user-related functionalities
 * @const
 */
const userController = require('../controllers/userController.js');

/**
 * JWT helpers module for authentication and user retrieval
 * @const
 */
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

/**
 * Module exports the router
 * @module
 */
module.exports = router;
