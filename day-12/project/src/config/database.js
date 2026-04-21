const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Conected to DB");
  });
}

module.exports = connectToDB;
