/**
 * Server Start krna
 * Database se connect krna
 */

require("dotenv").config(); // To enable access to environment variables
const app = require("./src/app");
const mongoose = require("mongoose");
const connectToDb = require("./src/config/database");

connectToDb();

app.listen(3000, () => {
  console.log("Server is running on port:3000");
});
