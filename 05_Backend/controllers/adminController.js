/**
 * Model for Issue
 * @const
 */
const Issue = require('../models/issue.model');

/**
 * Model for User
 * @const
 */
const User = require('../models/user.model');

/**
 * Model for Asset
 * @const
 */
const Asset = require('../models/asset.model');

/**
 * Controller function to get all open issues
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing open issues or an error message
 */
exports.getAllOpenIssues = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      // If not, return a 401 Unauthorized status code
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Find all issues where status is true (open)
    const issues = await Issue.find({ status: true }).populate('user_id', 'username');

    // Return the issues
    res.status(200).json(issues);
  } catch (err) {
    // Log any errors
    console.error(err);
    // Return a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller function to get all closed issues
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing closed issues or an error message
 */
exports.getAllCloseIssues = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      // If not, return a 401 Unauthorized status code
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Find all issues where status is false (closed)
    const issues = await Issue.find({ status: false })
      .populate('user_id', 'username')
      .populate('user_id_tech', 'username');

    // Return the issues
    res.status(200).json(issues);
  } catch (err) {
    // Log any errors
    console.error(err);
    // Return a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller function to get all available technicians
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing available technicians or an error message
 */
exports.getAllAvailableTechnicians = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      // If not, return a 401 Unauthorized status code
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Find all users where role is 'technician' and isAvailable is true
    const technicians = await User.find({ role: 'technician', isAvailable: true });

    // Return the technicians
    res.status(200).json(technicians);
  } catch (err) {
    // Log any errors
    console.error(err);
    // Return a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller function to assign an issue to a technician
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the updated issue and technician or an error message
 */
exports.assignIssue = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      // If not, return a 401 Unauthorized status code
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Update the issue with the technician's user_id
    const issue = await Issue.findByIdAndUpdate(req.body.issue_id, { user_id_tech: req.body.user_id_tech }, { new: true });

    // Set the technician's isAvailable field to false
    const technician = await User.findByIdAndUpdate(req.body.user_id_tech, { isAvailable: false }, { new: true });

    // Return the updated issue and technician
    res.status(200).json({ issue, technician });
  } catch (err) {
    // Log any errors
    console.error(err);
    // Return a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};
