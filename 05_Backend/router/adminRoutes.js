const express = require('express');
const adminController = require('../controllers/adminController');
const jwtHelpers = require('../dependencies/jwtHelpers');
const router = express.Router();

/**
 * Route for getting all open issues
 * @name GET/open
 * @function
 * @memberof router
 * @param {string} '/open' - The endpoint URL for retrieving all open issues
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} adminController.getAllOpenIssues - Controller function for retrieving all open issues
 */
router.get('/open', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getAllOpenIssues);

/**
 * Route for getting all closed issues
 * @name GET/close
 * @function
 * @memberof router
 * @param {string} '/close' - The endpoint URL for retrieving all closed issues
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} adminController.getAllCloseIssues - Controller function for retrieving all closed issues
 */
router.get('/close', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getAllCloseIssues);

/**
 * Route for admin to see all available technicians
 * @name GET/availtech
 * @function
 * @memberof router
 * @param {string} '/availtech' - The endpoint URL for retrieving all available technicians
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} adminController.getAllAvailableTechnicians - Controller function for retrieving all available technicians
 */
router.get('/availtech', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getAllAvailableTechnicians);
router.get('/countIssues', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getOpenAssignedIssueCounts);
/**
 * Route for assigning issues
 * @name PUT/assignIssue
 * @function
 * @memberof router
 * @param {string} '/assignIssue' - The endpoint URL for assigning issues
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} adminController.assignIssue - Controller function for assigning issues
 */
router.put('/assignIssue', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.assignIssue);
router.get('/users', adminController.getUserByUsername);

//router for leaderboard
router.get('/techniciansB', adminController.getAllTechnicians);
router.get('/operatorsB', adminController.getAllOperators);

module.exports = router;
