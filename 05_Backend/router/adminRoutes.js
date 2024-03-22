// Importing express
const express = require('express');

// Importing admin controller
const adminController = require('../controllers/adminController');

// Importing JWT helpers for authentication and user retrieval
const jwtHelpers = require('../dependencies/jwtHelpers');

// Initializing express router
const router = express.Router();

// Route for getting all open issues, with JWT verification and user retrieval middleware
router.get('/open', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getAllOpenIssues);

// Route for getting all closed issues, with JWT verification and user retrieval middleware
router.get('/close', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getAllCloseIssues);

// Route for admin to see all available technicians, with JWT verification and user retrieval middleware
router.get('/availtech', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.getAllAvailableTechnicians);

// Route for assigning issues, with JWT verification and user retrieval middleware
router.put('/assignIssue', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, adminController.assignIssue);

// Exporting the router module
module.exports = router;