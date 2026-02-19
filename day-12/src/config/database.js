const mongoose = require("mongoose");

// MONGO_URI access krne ke liye, make sure to install dotenv package. aserver.js ke andr first line me require config() kr lo.
function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

module.exports = connectToDB;
