/**
 * Controller function to get user profile
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the user profile data
 */
exports.getProfile = (req, res) => {
  // Assuming that the user object is already set in req.user by a previous middleware function
  const user = req.user;

  // Remove sensitive data
  user.password = undefined;

  // Send user profile data as JSON response
  res.send(user);
};
