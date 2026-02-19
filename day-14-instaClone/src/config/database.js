const mongoose = require("mongoose");

/**
 * console line run after above promise is resolved, which means connection to DB is successful
 * async function execution will pause untill the promise is resolved and then it will move to next line
 */

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // stop app if DB fails to connect
  }
}

module.exports = connectToDb;
