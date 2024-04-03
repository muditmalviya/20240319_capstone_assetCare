/**
 * Express module for handling HTTP requests
 * @const
 */
const express = require('express');

/**
 * Controller module for issue-related functionalities
 * @const
 */
const issueController = require('../controllers/issueController');

/**
 * JWT helpers module for authentication and user retrieval
 * @const
 */
const jwtHelpers = require('../dependencies/jwtHelpers');

/**
 * Express router for defining API routes
 * @type {object}
 * @namespace router
 */
const router = express.Router();

/**
 * Route for creating issues
 * @name POST/issues
 * @function
 * @memberof router
 * @param {string} '/issues' - The endpoint URL for creating issues
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} issueController.create - Controller function for creating issues
 */
router.post('/issues', jwtHelpers.verifyJwt, issueController.create);

/**
 * Route for getting issues by user
 * @name GET/issues
 * @function
 * @memberof router
 * @param {string} '/issues' - The endpoint URL for getting issues by user
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} issueController.getAllByUser - Controller function for getting issues by user
 */
router.get('/issues', jwtHelpers.verifyJwt, issueController.getAllByUser);

/**
 * Module exports the router
 * @module
 */
module.exports = router;
