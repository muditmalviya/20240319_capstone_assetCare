// Importing express and initializing router
const express = require('express');
const router = express.Router();

// Importing user controller
const userController = require('../controllers/userController.js');

// Importing JWT helpers for authentication and user retrieval
const jwtHelpers = require('../dependencies/jwtHelpers.js');

// Route for getting user profile, with JWT verification and user retrieval middleware
router.get('/profile', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, userController.getProfile);


// Exporting the router module
module.exports = router;