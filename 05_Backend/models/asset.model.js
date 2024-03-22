const mongoose = require('mongoose');

// Define schema
const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  num_issues_raised: {
    type: Number,
    default: 0
  },
  properties: {
    type: String
  }
});

// Create model
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
