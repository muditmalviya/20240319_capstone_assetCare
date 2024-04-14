/**
 * Model for storing issues
 * @const
 */
const Issue = require('../models/issue.model');

/**
 * Model for storing users
 * @const
 */
const User = require('../models/user.model');

/**
 * Controller function to get assigned issues for a technician
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the assigned issues or an error message
 */
exports.getAssignedIssues = async (req, res) => {
    if (req.user.role !== 'technician') {
        return res.status(401).json({ message: "Forbidden access. Only for technician" });
    }
    try {
        const issues = await Issue.find({ user_id_tech: req.user._id, status: 'Assigned' });
        res.status(200).json(issues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Controller function to change the status of an issue by a technician
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the updated technician and issue or an error message
 */
exports.changeStatus = async (req, res) => {
    try {
        // Check if the user is a technician
        if (req.user.role !== 'technician') {
            return res.status(403).json({ message: 'Forbidden: only technicians can access this route' });
        }

        // Update the technician's isAvailable field to true
        const technician = await User.findByIdAndUpdate(req.user._id, { isAvailable: true }, { new: true });

        // Update the issue's status field to false
        const issue = await Issue.findByIdAndUpdate(req.body.issue_id, { status: 'Closed' }, { new: true });

        res.status(200).json({ technician, issue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Controller function to get the technician's history of resolved issues
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the resolved issues or an error message
 */
exports.getTechnicianHistory = async (req, res) => {
    try {
        // Check if the user is a technician
        if (req.user.role !== 'technician') {
            return res.status(403).json({ message: 'Forbidden: only technicians can access this route' });
        }

        // Find all issues where user_id_tech is the technician's id and status is false
        const issues = await Issue.find({ user_id_tech: req.user._id, status: 'Closed' });
        res.status(200).json(issues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
