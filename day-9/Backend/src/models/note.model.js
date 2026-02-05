// Is file me data ka schema bnate hai, and model banate hai jis data ko hum db pe store krenge.
// database me data store krne se pahle hme us data ka format btana pdta hai, is format ko hum schema bolte hai.

const mongoose = require('mongoose');

// Schema => format of data that we want to store in DB
// make sure to add the `new` keyword
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Model is used to perform CRUD opeartions in Database, without model we can't perform any operations

const noteModel = mongoose.model('notes', noteSchema);
// here the "notes" is the name of collection in which all notes get stored in Database
// Is model se bne hue sare notes ka format noteSchema format hoga

module.exports = noteModel;
