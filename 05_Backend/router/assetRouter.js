// Importing express
const express = require('express');
// Initializing express router
const router = express.Router();

// Importing admin controller
const assetController = require('../controllers/assetController');

// Importing JWT helpers for authentication and user retrieval
const jwtHelpers = require('../dependencies/jwtHelpers');





router.post('/postAsset', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, assetController.createAsset);


// Exporting the router module
module.exports = router;