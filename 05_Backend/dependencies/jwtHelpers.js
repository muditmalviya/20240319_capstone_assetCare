const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require("../models/user.model");
const mongoose = require("mongoose");

/** Middleware helper function to verify JWT token
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
async function verifyJwt(req, res, next) {
  // Token is of the format Bearer `token` in the headers
  const token = req.headers.authorization?.split(" ")[1];

  // If there is no token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no JWT found." });
  }

  // Verify token
  try {
    const decoded = await jwt.verify(token, secret);
    // Sets user (ID) in the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized JWT" });
  }
}

/** helper function to get the user object from it's ID
 */
async function getUserFromId(userId) {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return false;
  }
  return user
}

/** Middleware helper function to get and set the user object in request object
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
async function getUserMiddleware(req, res, next) {
  const user = await getUserFromId(req.user.userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
}
/** Middleware helper function to get and set the user object in request object
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
async function checkRole(req, res, next) {
  try {
    const user = req.body.user_id;
    console.log("User:", user); // Log user object
    // if (!user || !user.role || user.role.trim().toLowerCase() !== 'operator') {
    //   return res.status(403).json({ message: "You don't have rights to do this functionality" });
    // }
    next();
  } catch (error) {
    console.error("Error in checkRole middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
/** Middleware helper function to get and set the user object in request object
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function to call
 */
async function isAdmin (req, res, next) {
  try {
    // Assuming req.user.role contains the user's role fetched from the database
    console.log(req.user)
    const userRole = req.user.role;

    // Check if the user's role is admin
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: only admins can access this route' });
    }

    // If the user is an admin, call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





module.exports = { verifyJwt, getUserFromId, getUserMiddleware, checkRole, isAdmin};
