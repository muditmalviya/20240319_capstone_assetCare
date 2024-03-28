// Importing external dependencies
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const cors = require("cors")

// Importing database connection function
const { connectToDatabase } = require("./database/db");

// Importing internal routers
const authRouter = require("./router/authRouter");
const issueRoutes = require('./router/issueRouter.js');
const userRoutes = require('./router/userRouter');
const adminRoutes = require('./router/adminRoutes.js');
const technicianRoutes = require('./router/technicianRoutes.js');
const assetRoutes = require('./router/assetRouter.js');

// Initializing the express app
const app = express();


// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "mRounds",
//       description: "Asset Management Product for Industries",
//       contact: {
//         name: "Mudit Malviya"
//       },
//       servers: ["http://localhost:3000"]
//     },
//     components: {
//       securitySchemes: {
//         BearerAuth: {
//           type: "http",
//           scheme: "Bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [
//       {
//         BearerAuth: [],
//       },
//     ],
//   },
//   apis: ["index.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'mRounds',
    version: '1.0.0',
  },
  servers: [{
    url: "http://localhost:3000/"
  }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "Bearer",
        bearerFormat: "JWT", // Optional, but good to specify if using JWTs
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};


// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./index.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsDoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-ui-express)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) 

// Using bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Using cors middleware to enable Cross Origin Resource Sharing
app.use(cors());

// Using the authentication router for all requests starting with "/auth"
/**
 * @swagger
 * /auth/signup:
 *  post:
 *    description: Use to register a new user
 *    tags:
 *      - Authentication
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - email
 *            - password
 *            - phoneno
 *            - role
 *            - isAvailable
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            phoneno:
 *              type: integer
 *            role:
 *              type: string
 *            isAvailable:
 *              type: boolean
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad Request. User already exists or invalid data.
 *      '500':
 *        description: Internal server error.
 */

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Authentication
 *    description: Use to authenticate a user by signin
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      '401':
 *        description: Unauthorized. Invalid username or password.
 *      '500':
 *        description: Internal server error.
 */


app.use("/auth", authRouter);

/**
 * @swagger
 * /api/issues:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Issues
 *    description: Use to request all issues
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  title:
 *                    type: string
 *                  description:
 *                    type: string
 *                  status:
 *                    type: string
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '500':
 *        description: Internal server error.
 */


/**
 * @swagger
 * /api/issues:
 *  post:
 *    tags:
 *      - Issues
 *    description: Use to report an issue
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: issue
 *        description: The issue to report.
 *        schema:
 *          type: object
 *          required:
 *            - asset_name
 *            - status
 *            - energy_consumption
 *            - hours_of_operation
 *            - noise_level
 *            - temperature
 *            - physical_condition
 *            - vibration
 *            - description
 *          properties:
 *            asset_name:
 *              type: string
 *            status:
 *              type: boolean
 *            energy_consumption:
 *              type: integer
 *            hours_of_operation:
 *              type: integer
 *            noise_level:
 *              type: integer
 *            temperature:
 *              type: integer
 *            physical_condition:
 *              type: string
 *            vibration:
 *              type: integer
 *            description:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                asset_name:
 *                  type: string
 *                status:
 *                  type: boolean
 *                energy_consumption:
 *                  type: integer
 *                hours_of_operation:
 *                  type: integer
 *                noise_level:
 *                  type: integer
 *                temperature:
 *                  type: integer
 *                physical_condition:
 *                  type: string
 *                vibration:
 *                  type: integer
 *                description:
 *                  type: string
 *                __v:
 *                  type: integer
 *      '400':
 *        description: Bad Request. Invalid data.
 *      '500':
 *        description: Internal server error.
 */
app.use('/api', issueRoutes);

/**
 * @swagger
 * /user/profile:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Profile
 *    description: Use to request the user's profile
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                phoneno:
 *                  type: integer
 *                role:
 *                  type: string
 *                isAvailable:
 *                  type: boolean
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '404':
 *        description: User not found.
 *      '500':
 *        description: Internal server error.
 */
app.use('/user', userRoutes);


/**
 * @swagger
 * /admin/open:
 *  get:
 *    tags:
 *      - Admin
 *    description: Use to request the open status issues
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  user_id:
 *                    type: string
 *                  status:
 *                    type: boolean
 *                  energy_consumption:
 *                    type: integer
 *                  hours_of_operation:
 *                    type: integer
 *                  noise_level:
 *                    type: integer
 *                  temperature:
 *                    type: integer
 *                  physical_condition:
 *                    type: string
 *                  vibration:
 *                    type: integer
 *                  description:
 *                    type: string
 *                  __v:
 *                    type: integer
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '500':
 *        description: Internal server error.
 */


/**
 * @swagger
 * /admin/close:
 *  get:
 *    tags:
 *      - Admin
 *    description: Use to request the close status issues
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                user_id:
 *                  type: string
 *                status:
 *                  type: boolean
 *                energy_consumption:
 *                  type: integer
 *                hours_of_operation:
 *                  type: integer
 *                noise_level:
 *                  type: integer
 *                temperature:
 *                  type: integer
 *                physical_condition:
 *                  type: string
 *                vibration:
 *                  type: integer
 *                description:
 *                  type: string
 *                __v:
 *                  type: integer
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '500':
 *        description: Internal server error.
 */

/**
 * @swagger
 * /admin/availtech:
 *  get:
 *    tags:
 *      - Admin
 *    description: Use to request the available technicians
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  username:
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *                  phoneno:
 *                    type: integer
 *                  role:
 *                    type: string
 *                  isAvailable:
 *                    type: boolean
 *                  __v:
 *                    type: integer
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '500':
 *        description: Internal server error.
 */

/**
 * @swagger
 * /admin/assignIssue:
 *  put:
 *    tags:
 *      - Admin
 *    description: Use to assign an issue to a technician
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: issue
 *        description: The issue to assign.
 *        schema:
 *          type: object
 *          required:
 *            - issue_id
 *            - user_id_tech
 *          properties:
 *            issue_id:
 *              type: string
 *            user_id_tech:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                issue:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    user_id:
 *                      type: string
 *                    asset_name:
 *                      type: string
 *                    status:
 *                      type: boolean
 *                    energy_consumption:
 *                      type: integer
 *                    hours_of_operation:
 *                      type: integer
 *                    noise_level:
 *                      type: integer
 *                    temperature:
 *                      type: integer
 *                    physical_condition:
 *                      type: string
 *                    vibration:
 *                      type: integer
 *                    description:
 *                      type: string
 *                    __v:
 *                      type: integer
 *                    user_id_tech:
 *                      type: string
 *                technician:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    username:
 *                      type: string
 *                    email:
 *                      type: string
 *                    password:
 *                      type: string
 *                    phoneno:
 *                      type: integer
 *                    role:
 *                      type: string
 *                    isAvailable:
 *                      type: boolean
 *                    __v:
 *                      type: integer
 *      '400':
 *        description: Bad Request. Invalid data.
 *      '500':
 *        description: Internal server error.
 */
app.use('/admin', adminRoutes)

/**
 * @swagger
 * /technician/assignedIssues:
 *  get:
 *    tags:
 *      - Technician
 *    description: Use to request all issues assigned to the technician
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  user_id:
 *                    type: string
 *                  asset_name:
 *                    type: string
 *                  status:
 *                    type: boolean
 *                  energy_consumption:
 *                    type: integer
 *                  hours_of_operation:
 *                    type: integer
 *                  noise_level:
 *                    type: integer
 *                  temperature:
 *                    type: integer
 *                  physical_condition:
 *                    type: string
 *                  vibration:
 *                    type: integer
 *                  description:
 *                    type: string
 *                  __v:
 *                    type: integer
 *                  user_id_tech:
 *                    type: string
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '500':
 *        description: Internal server error.
 */

/**
 * @swagger
 * /technician/changestatus:
 *  put:
 *    tags:
 *      - Technician
 *    description: Use to change the status of an issue
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: issue
 *        description: The issue to change status.
 *        schema:
 *          type: object
 *          required:
 *            - issue_id
 *          properties:
 *            issue_id:
 *              type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                user_id:
 *                  type: string
 *                status:
 *                  type: boolean
 *                energy_consumption:
 *                  type: integer
 *                hours_of_operation:
 *                  type: integer
 *                noise_level:
 *                  type: integer
 *                temperature:
 *                  type: integer
 *                physical_condition:
 *                  type: string
 *                vibration:
 *                  type: integer
 *                description:
 *                  type: string
 *                __v:
 *                  type: integer
 *      '400':
 *        description: Bad Request. Invalid data.
 *      '500':
 *        description: Internal server error.
 */

/**
 * @swagger
 * /technician/history:
 *  get:
 *    tags:
 *      - Technician
 *    description: Use to request the history of the technician
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  username:
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *                  phoneno:
 *                    type: integer
 *                  role:
 *                    type: string
 *                  isAvailable:
 *                    type: boolean
 *                  __v:
 *                    type: integer
 *      '401':
 *        description: Unauthorized. Invalid or no token provided.
 *      '500':
 *        description: Internal server error.
 */
app.use('/technician', technicianRoutes)

/**
 * @swagger
 * /asset/postAsset:
 *  post:
 *    tags:
 *      - Asset
 *    description: Use to create a new asset
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: asset
 *        description: The asset to create.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - num_issues_raised
 *            - properties
 *          properties:
 *            name:
 *              type: string
 *            num_issues_raised:
 *              type: integer
 *            properties:
 *              type: string
 *    responses:
 *      '201':
 *        description: Created. The asset has been successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                name:
 *                  type: string
 *                num_issues_raised:
 *                  type: integer
 *                properties:
 *                  type: string
 *                __v:
 *                  type: integer
 *      '400':
 *        description: Bad Request. Invalid data.
 *      '500':
 *        description: Internal server error.
 */
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