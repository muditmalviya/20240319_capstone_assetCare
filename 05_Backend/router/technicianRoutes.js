// Importing express
const express = require('express');

// Importing technician controller
const techController = require('../controllers/technicianController');

// Importing JWT helpers for authentication and user retrieval
const jwtHelpers = require('../dependencies/jwtHelpers');

// Initializing express router
const router = express.Router();

// Route for getting assigned issues, with JWT verification and user retrieval middleware
router.get('/assignedIssues', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, techController.getAssignedIssues);

// Route for changing status, with JWT verification and user retrieval middleware
router.put('/changestatus', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, techController.changeStatus);

// Route for getting technician history, with JWT verification and user retrieval middleware
router.get('/history', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, techController.getTechnicianHistory);

// Exporting the router module
module.exports = router;