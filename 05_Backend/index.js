// Importing external dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors")

// Importing database connection function
const { connectToDatabase } = require("./database/db");

// Importing internal routers
const authRouter = require("./router/authRouter");

// Initializing the express app
const app = express();

// Using bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Using cors middleware to enable Cross Origin Resource Sharing
app.use(cors());

// Using the authentication router for all requests starting with "/auth"
app.use("/auth", authRouter);

// Importing and using issue routes for all requests starting with "/api"
const issueRoutes = require('./router/issueRouter.js');
app.use('/api', issueRoutes);

// Importing and using user routes for all requests starting with "/api"
const userRoutes = require('./router/userRouter');
app.use('/api', userRoutes);

// Importing and using admin routes for all requests starting with "/api"
const adminRoutes = require('./router/adminRoutes.js')
app.use('/api', adminRoutes)

// Importing and using technician routes for all requests starting with "/api"
const technicianRoutes = require('./router/technicianRoutes.js')
app.use('/api', technicianRoutes)

const assetRoutes = require('./router/assetRouter.js')
app.use('/asset', assetRoutes)



// Function to start the server and connect to the database
async function startServerAndDatabase() {
    // Connecting to the database
    await connectToDatabase();

    // Starting the server
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server live at ${process.env.PORT || 3000}`)
    );
}

// Calling the function to start the server and connect to the database
startServerAndDatabase();