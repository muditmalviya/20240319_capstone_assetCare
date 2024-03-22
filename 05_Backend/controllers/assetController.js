const Asset = require('../models/asset.model');
// Importing User model
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createAsset(req, res) {
      // Check if the user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: only admins can access this route' });
      }
   try {
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
};

module.exports = {createAsset}