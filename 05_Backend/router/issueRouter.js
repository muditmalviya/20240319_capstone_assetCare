const express = require('express');
const issueController = require('../controllers/issueController');
const jwtHelpers = require('../dependencies/jwtHelpers');
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

// Route to get issues within a date range
router.get('/issuesD', issueController.getIssuesByDateRange);

module.exports = router;
