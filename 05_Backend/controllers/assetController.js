/**
 * Model for Asset
 * @const
 */
const Asset = require('../models/asset.model');

/**
 * Controller function to create a new asset
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the saved asset or an error message
 */
async function createAsset(req, res) {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: only admins can access this route' });
    }
    
    // Create a new instance of the Asset model with data from the request body
    const newAsset = new Asset(req.body);
    
    // Save the new asset to the database
    const savedAsset = await newAsset.save();
    
    // Respond with the saved asset
    res.status(201).json(savedAsset);
  } catch (error) {
    // Handle any errors that occur during creation and saving of the asset
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Controller function to get assets with their name and num_issues_raised
async function getAssets(req, res){
  try {
    // Fetch assets from the database
    const assets = await Asset.find({}, 'name num_issues_raised');

    // Return the assets
    res.json(assets);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createAsset , getAssets};
