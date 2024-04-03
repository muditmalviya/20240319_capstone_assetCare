/**
 * Express module for handling HTTP requests
 * @const
 */
const express = require('express');

/**
 * Controller module for technician-related functionalities
 * @const
 */
const techController = require('../controllers/technicianController');

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
 * Route for getting assigned issues
 * @name GET/assignedIssues
 * @function
 * @memberof router
 * @param {string} '/assignedIssues' - The endpoint URL for getting assigned issues
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} techController.getAssignedIssues - Controller function for getting assigned issues
 */
router.get('/assignedIssues', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, techController.getAssignedIssues);

/**
 * Route for changing status
 * @name PUT/changestatus
 * @function
 * @memberof router
 * @param {string} '/changestatus' - The endpoint URL for changing status
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} techController.changeStatus - Controller function for changing status
 */
router.put('/changestatus', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, techController.changeStatus);

/**
 * Route for getting technician history
 * @name GET/history
 * @function
 * @memberof router
 * @param {string} '/history' - The endpoint URL for getting technician history
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} techController.getTechnicianHistory - Controller function for getting technician history
 */
router.get('/history', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, techController.getTechnicianHistory);

/**
 * Module exports the router
 * @module
 */
module.exports = router;
