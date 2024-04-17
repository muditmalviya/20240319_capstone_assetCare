const Issue = require('../models/issue.model');
const User = require('../models/user.model');
const Asset = require('../models/asset.model');

/**
 * Controller function to get all open issues
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing open issues or an error message
 */
exports.getAllOpenIssues = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Find all issues where status is "opened"
    const openedIssues = await Issue.find({ status: 'Opened' }).populate('user_id', 'username');
    
    // Find all issues where status is "assigned"
    const assignedIssues = await Issue.find({ status: 'Assigned' }).populate('user_id', 'username');

    // Concatenate the two arrays of issues, with opened issues first
    const allOpenIssues = openedIssues.concat(assignedIssues);
    res.status(200).json(allOpenIssues);
  } catch (err) {
    console.error(err);
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
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }
    const issues = await Issue.find({ status: 'Closed' })
      .sort({ timestamp: -1 })
      .populate('user_id', 'username')
      .populate('user_id_tech', 'username');

    res.status(200).json(issues);
  } catch (err) {
    console.error(err);
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
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }
    const technicians = await User.find({ role: 'technician', isAvailable: true });

    res.status(200).json(technicians);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const timestamp_assigned = new Date();
    const issue = await Issue.findByIdAndUpdate(
      req.body.issue_id,
      { user_id_tech: user._id, status: 'Assigned', timestamp_assigned},
      { new: true }
    );


    // Set the technician's isAvailable field to false
    const technician = await User.findByIdAndUpdate(
      user._id,
      { isAvailable: false },
      { new: true }
    );
    res.status(200).json({ issue, technician });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOpenAssignedIssueCounts = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: "Forbidden access. Only for admin permission is granted" });
    }

    // Find the number of issues with status "Opened"
    const openedCount = await Issue.countDocuments({ status: 'Opened' });

    // Find the number of issues with status "Assigned"
    const assignedCount = await Issue.countDocuments({ status: 'Assigned' });
    res.status(200).json({ openedCount, assignedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllTechnicians = async (req, res) => {
  try {
    const technicians = await User.find({ role: 'technician' }, {username: 1, rewards: 1 });

    res.status(200).json(technicians);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllOperators = async (req, res) => {
  try {
    const operators = await User.find({ role: 'operator' }, {username: 1, rewards: 1 });

    res.status(200).json(operators);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};