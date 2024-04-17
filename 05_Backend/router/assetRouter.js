const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const jwtHelpers = require('../dependencies/jwtHelpers');

/**
 * Route for creating a new asset
 * @name POST/postAsset
 * @function
 * @memberof router
 * @param {string} '/postAsset' - The endpoint URL for creating a new asset
 * @param {function} jwtHelpers.verifyJwt - Middleware for JWT verification
 * @param {function} jwtHelpers.getUserMiddleware - Middleware for retrieving user information
 * @param {function} assetController.createAsset - Controller function for creating a new asset
 */
router.post('/postAsset', jwtHelpers.verifyJwt, jwtHelpers.getUserMiddleware, assetController.createAsset);

// Route to get assets
router.get('/assets', assetController.getAssets);


module.exports = router;
