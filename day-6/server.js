/**
 * Server ko start krna
 * Database se connect krna
 */

require("dotenv").config(); // first line hi honi chahiye yeh.

const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
}

connectToDb(); // Server connects to Database

app.listen(3000, () => {
  console.log("Server is running at port: 3000");
});

/*
Server is running at port: 3000
Connected to Database
*/
