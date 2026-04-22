const mongoose = require("mongoose");

// Database connecting function. To use MONGO_URI from .env file, we need dotenv package.
function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

module.exports = connectToDB;
