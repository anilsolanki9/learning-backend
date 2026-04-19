// Is file me database se connect krne vala code likhte hai

const mongoose = require("mongoose"); // we use mongoose to connect with database

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connect to DB");
  });
}

module.exports = connectToDB;
