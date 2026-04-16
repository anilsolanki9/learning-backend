/**
 * Database se connect krne vala logic likhenge isme
 */

const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
}

module.exports = connectToDb;

/*
Connection URI -> mongodb+srv://<db_username>:<db_password>@cluster0.prppvo2.mongodb.net/
*/
