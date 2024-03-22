// Importing necessary libraries and modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserToken = require("../models/Usertoken");

// Importing User model
const User = require("../models/user.model");

// Importing validators
const {
  usernameValidator,
  emailValidator,
  passwordValidator,
} = require("../dependencies/user");

// Function to register a new user
async function register(req, res) {
    // Extracting user details from request body
    const { username, email, password, phoneno, role, isAvailable } = req.body;
  
    // Validate username format
    if (!usernameValidator(username)) {
      return res.status(400).json({ message: "Invalid username format" });
    }
    // Validate email format
    if (!emailValidator(email)) {
      return res.status(400).json({ message: "Invalid username format" });
    }
  
    // Validate password length
    if (!passwordValidator(password)) {
      return res.status(400).json({ message: "Invalid password length" });
    }
  
    try {
      // Check if username already exists in the database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user document
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phoneno,
        role,
        isAvailable
      });
  
      // Save the new user document to the database
      await newUser.save();
  
      // Respond with success message
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
}

// Function to login a user
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
        return res.json({ token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}

// Exporting the register and login functions
module.exports = {register, login}