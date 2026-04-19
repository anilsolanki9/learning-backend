// Logic to connect to DB

const monoose = require("mongoose");

function connectToDB() {
  monoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}

module.exports = connectToDB;
