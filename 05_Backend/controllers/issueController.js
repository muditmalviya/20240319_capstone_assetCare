/**
 * Model for storing issues
 * @const
 */
const Issue = require('../models/issue.model');

/**
 * Model for storing assets
 * @const
 */
const Asset = require('../models/asset.model');

/**
 * Controller function to create a new issue
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the saved issue or an error message
 */
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

/**
 * Controller function to get all issues by a specific user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the issues or an error message
 */
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

exports.getIssuesByDateRange = async (req, res) => {
  try {
    const fromDate = new Date(req.query.fromDate);
    const toDate = new Date(req.query.toDate);
    
    // Adjust the toDate to include the entire day by setting it to the end of the day
    toDate.setUTCHours(23, 59, 59, 999);

    // Fetch issues from the database within the specified date range
    const issues = await Issue.find({
      timestamp: { $gte: fromDate, $lte: toDate }
    });

    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};