// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors")

// Database connection
const { connectToDatabase } = require("./database/db");

// Importing Internal Routers
const authRouter = require("./router/authRouter");


// Setting up the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
// Authentication Router
app.use("/auth", authRouter);

async function startServerAndDatabase() {
    await connectToDatabase();
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server live at ${process.env.PORT || 3000}`)
    );
  }
  
  startServerAndDatabase();
