// Is file me database se connect krne vala code likhte hai

const mongoose = require('mongoose'); // we use mongoose to connect with database

function connectToDB() {
  // mongoose.connect() URI accept krta hai, and ye URI hmare cluster me present database ki URI hoti hai. and its an asyncronous function
  // URI is private so we add this in .env, and use dotenv package to access env variable
  // server.js me pahli line add krenge -> require('dotenv').config();
  // URI => connectString/database-name
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connect to DB');
  });
}

module.exports = connectToDB;
