const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const PasswordResetToken = require('../models/resetToken');
const crypto = require('crypto');
require("dotenv").config();
const UserToken = require("../models/Usertoken");


const User = require("../models/user.model");


const {
  usernameValidator,
  emailValidator,
  passwordValidator,
} = require("../dependencies/user");

/**
 * Controller function to register a new user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing a success message or an error message
 */
async function register(req, res) {
    // Extracting user details from request body
    const { username, email, password, phoneno, role, isAvailable } = req.body;
  
    
    if (!usernameValidator(username)) {
      return res.status(400).json({ message: "Invalid username format" });
    }
    
    if (!emailValidator(email)) {
      return res.status(400).json({ message: "Invalid username format" });
    }
  
    
    if (!passwordValidator(password)) {
      return res.status(400).json({ message: "Invalid password length" });
    }
  
    try {
      // Check if username already exists in the database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phoneno,
        role,
        isAvailable
      });
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
}

/**
 * Controller function to login a user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Returns a JSON object containing a JWT token or an error message
 */
async function login(req, res) {
    // Extracting username and password from request body
    const { username, password } = req.body;
  
    // Validate username format
    if (!usernameValidator(username)) {
      return res.status(400).json({ message: "Invalid username format" });
    }
  
    // Validate password length
    if (!passwordValidator(password)) {
      return res.status(400).json({ message: "Invalid password length" });
    }
  
    try {
      // Find the user in the database
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(401).json({ message: "Invalid user" });
      }
      // Check if the password is correct
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.json({ success: false, message: "passwords do not match" });
      } else if (validPassword) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ token,  role: user.role});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}


// Exporting the register and login functions
module.exports = {register, login}