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

    // Find all issues where status is "opened"
    const openedIssues = await Issue.find({ status: 'Opened' }).populate('user_id', 'username');
    
    // Find all issues where status is "assigned"
    const assignedIssues = await Issue.find({ status: 'Assigned' }).populate('user_id', 'username');

    // Concatenate the two arrays of issues, with opened issues first
    const allOpenIssues = openedIssues.concat(assignedIssues);

    // Return the concatenated array of issues
    res.status(200).json(allOpenIssues);
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
    const issues = await Issue.find({ status: 'Closed' })
      .sort({ timestamp: -1 })
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

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;

    // Find the user based on the provided username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by username:', error);
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

    // Find the user based on the provided username
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the issue with the technician's user_id
    const issue = await Issue.findByIdAndUpdate(
      req.body.issue_id,
      { user_id_tech: user._id, status: 'Assigned' },
      { new: true }
    );

    // Set the technician's isAvailable field to false
    const technician = await User.findByIdAndUpdate(
      user._id,
      { isAvailable: false },
      { new: true }
    );

    // Return the updated issue and technician
    res.status(200).json({ issue, technician });
  } catch (err) {
    // Log any errors
    console.error(err);
    // Return a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOpenAssignedIssueCounts = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      // If not, return a 401 Unauthorized status code
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Find the number of issues with status "Opened"
    const openedCount = await Issue.countDocuments({ status: 'Opened' });

    // Find the number of issues with status "Assigned"
    const assignedCount = await Issue.countDocuments({ status: 'Assigned' });

    // Return the counts
    res.status(200).json({ openedCount, assignedCount });
  } catch (err) {
    // Log any errors
    console.error(err);
    // Return a 500 Internal Server Error status code
    res.status(500).json({ message: 'Internal server error' });
  }
};

