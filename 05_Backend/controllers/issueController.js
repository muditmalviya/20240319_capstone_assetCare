// // Importing the Issue model
// const Issue = require('../models/issue.model');
// const Asset = require('../models/asset.model')

// // Function to create a new issue
// exports.create = async (req, res) => {
//   // Creating a new issue instance with the data from the request body
//   const issue = new Issue({
//     user_id: req.user.userId, // get user ID from JWT
//     status: req.body.status,
//     energy_consumption: req.body.energy_consumption,
//     hours_of_operation: req.body.hours_of_operation,
//     noise_level: req.body.noise_level,
//     temperature: req.body.temperature,
//     physical_condition: req.body.physical_condition,
//     vibration: req.body.vibration,
//     description: req.body.description
//   });

//   try {
//     // Saving the issue to the database
//     const savedIssue = await issue.save();
//     // Responding with the saved issue
//     res.status(201).json(savedIssue);
//   } catch (err) {
//     // Logging any errors
//     console.error(err);
//     // Responding with a 500 Internal Server Error status code
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };




// Importing the Issue and Asset models
const Issue = require('../models/issue.model');
const Asset = require('../models/asset.model');

// Function to create a new issue
exports.create = async (req, res) => {
  // Check if the asset exists
  const asset = await Asset.findOne({ name: req.body.asset_name });
  if (!asset) {
    return res.status(400).json({ message: 'Asset does not exist' });
  }

  // Creating a new issue instance with the data from the request body
  const issue = new Issue({
    user_id: req.user.userId, // get user ID from JWT
    asset_name: req.body.asset_name, // add asset_name field
    status: req.body.status,
    energy_consumption: req.body.energy_consumption,
    hours_of_operation: req.body.hours_of_operation,
    noise_level: req.body.noise_level,
    temperature: req.body.temperature,
    physical_condition: req.body.physical_condition,
    vibration: req.body.vibration,
    description: req.body.description
  });

  try {
    // Saving the issue to the database
    const savedIssue = await issue.save();

    // Increment the num_issues_raised field in the Asset model
    asset.num_issues_raised += 1;
    await asset.save();

    // Responding with the saved issue
    res.status(201).json(savedIssue);
  } catch (err) {
    // Logging any errors
    console.error(err);
    // Responding with a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Function to get all issues by a specific user
exports.getAllByUser = async (req, res) => {
    try {
      // Finding all issues where the user_id matches the user's ID from the JWT
      const issues = await Issue.find({ user_id: req.user.userId });
      // Responding with the issues
      res.status(200).json(issues);
    } catch (err) {
      // Logging any errors
      console.error(err);
      // Responding with a 500 Internal Server Error status code
      res.status(500).json({ message: 'Internal server error' });
    }
  };