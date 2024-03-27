const Issue = require('../models/issue.model');
const User = require('../models/user.model')


exports.getAssignedIssues = async (req, res) => {

    if(req.user.role!=='technician'){
        res.status(401).json({message: "Forbidden access. Only for technician"})
      }
    try {
      const issues = await Issue.find({ user_id_tech: req.user._id , status: true});
      res.status(200).json(issues);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  // issueController.js
exports.changeStatus = async (req, res) => {
    try {
      // Check if the user is a technician
      if (req.user.role !== 'technician') {
        return res.status(403).json({ message: 'Forbidden: only technicians can access this route' });
      }
  
      // Update the technician's isAvailable field to true
      const technician = await User.findByIdAndUpdate(req.user._id, { isAvailable: true }, { new: true });
  
      // Update the issue's status field to false
      const issue = await Issue.findByIdAndUpdate(req.body.issue_id, { status: false }, { new: true });
  
      res.status(200).json({ technician, issue });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  // issueController.js
exports.getTechnicianHistory = async (req, res) => {
    try {
      // Check if the user is a technician
      if (req.user.role !== 'technician') {
        return res.status(403).json({ message: 'Forbidden: only technicians can access this route' });
      }
  
      // Find all issues where user_id_tech is the technician's id and status is false
      const issues = await Issue.find({ user_id_tech: req.user._id, status: false });
      res.status(200).json(issues);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };