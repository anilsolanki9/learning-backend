/**
 * This file has two tasks
 * Server start krna
 * Database se connect krna
 */

/**
 * This enables the access of env variables
 * Make sure this is first line in server.js
 */
require('dotenv').config();

// importing app server
const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB();

// starting the server, // callback run hoga jab server is ready to listen user requests
app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
