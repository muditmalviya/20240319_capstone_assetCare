const express = require('express');
const techController = require('../controllers/technicianController');
const jwtHelpers = require('../dependencies/jwtHelpers');
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


module.exports = router;
