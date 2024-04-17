/**
 * Controller function to get user profile
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing the user profile data
 */
exports.getProfile = (req, res) => {
  const user = req.user;
  user.password = undefined;
  res.send(user);
};
