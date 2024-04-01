// Importing the Issue and User models
const Issue = require('../models/issue.model');
const User = require('../models/user.model')
const Asset = require('../models/asset.model')

// Function to get all open issues
// exports.getAllOpenIssues = async (req, res) => {
//   if(req.user.role!=='admin'){
//     res.status(401).json({message: "Forbidden access. Only for admin permission is granted"})
//   }
//   try {
//       const issues = await Issue.find({ status: true });
//       res.status(200).json(issues);
//   } catch (err) {
//       console.error(err);
      
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Function to get all open issues
exports.getAllOpenIssues = async (req, res) => {
  // Check if the user is an admin
  if(req.user.role!=='admin'){
    // If not, return a 401 Unauthorized status code
    res.status(401).json({message: "Forbidden access. Only for admin permission is granted"})
  }
  try {
      // Find all issues where status is true (open)
      const issues = await Issue.find({ status: true })
        .populate('user_id', 'username') // This line is added
      // Return the issues
      res.status(200).json(issues);
  } catch (err) {
      // Log any errors
      console.error(err);
      // Return a 500 Internal Server Error status code
      res.status(500).json({ message: 'Internal server error' });
  }
};



// Function to get all closed issues
exports.getAllCloseIssues = async (req, res) => {
  // Check if the user is an admin
  if(req.user.role!=='admin'){
    // If not, return a 401 Unauthorized status code
    res.status(401).json({message: "Forbidden access. Only for admin permission is granted"})
  }
  try {
      // Find all issues where status is false (closed)
      const issues = await Issue.find({ status: false });
      // Return the issues
      res.status(200).json(issues);
  } catch (err) {
      // Log any errors
      console.error(err);
      // Return a 500 Internal Server Error status code
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all available technicians
exports.getAllAvailableTechnicians = async (req, res) => {
  // Check if the user is an admin
  if(req.user.role!=='admin'){
    // If not, return a 401 Unauthorized status code
    res.status(401).json({message: "Forbidden access. Only for admin permission is granted"})
  }
  try {
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

// Function to assign an issue to a technician
exports.assignIssue = async (req, res) => {
  // Check if the user is an admin
  if(req.user.role!=='admin'){
    // If not, return a 401 Unauthorized status code
    res.status(401).json({message: "Forbidden access. Only for admin permission is granted"})
  }
  try {
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