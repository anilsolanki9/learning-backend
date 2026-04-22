const mongoose = require("mongoose");

function connectToD() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

module.exports = connectToD;
