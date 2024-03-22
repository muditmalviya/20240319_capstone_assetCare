// Importing express
const express = require('express');

// Importing issue controller
const issueController = require('../controllers/issueController');

// Importing JWT helpers for authentication and user retrieval
const jwtHelpers = require('../dependencies/jwtHelpers');

// Initializing express router
const router = express.Router();

// Route for creating issues, with JWT verification middleware
router.post('/issues', jwtHelpers.verifyJwt, issueController.create);

// Route for getting issues by user, with JWT verification middleware
router.get('/issues', jwtHelpers.verifyJwt, issueController.getAllByUser);

// Exporting the router module
module.exports = router;