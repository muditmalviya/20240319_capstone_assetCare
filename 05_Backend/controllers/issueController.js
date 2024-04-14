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
  const { userId } = req.user; // Assuming userId is available in req.user from JWT
  const {
    asset_name,
    status,
    energy_consumption,
    hours_of_operation,
    noise_level,
    temperature,
    physical_condition,
    vibration,
    description
  } = req.body;

  try {
    // Creating a new issue object
    const issue = new Issue({
      user_id: userId, // Assigning user ID from JWT
      asset_name,
      status: status || 'Opened', // Default to 'opened' if status is not provided
      energy_consumption,
      hours_of_operation,
      noise_level,
      temperature,
      physical_condition,
      vibration,
      description
    });

    // Saving the issue to the database
    const savedIssue = await issue.save();

    // If asset_name is related to an Asset model and you want to update it:
    await Asset.findOneAndUpdate(
      { name: asset_name }, // Filter to find the asset by name
      { $inc: { num_issues_raised: 1 } } // Increment num_issues_raised by 1
    );

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
    const issues = await Issue.find({ user_id: req.user.userId })
                               .sort({ timestamp: -1 }); // Sorting by timestamp in descending order
    // Responding with the sorted issues
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