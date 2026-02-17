const mongoose = require("mongoose");

// Schema create krna. Schema = Format of data we want to store
const noteSchema = mongoose.Schema({
  title: String,
  description: String,
});

/**
 * CRUD perform krne ke liye model create krte h.
 * `notes` is the name of collection in database in which all notes get stored.
 * Is model ko APIs me use krenge.
 */
const notesModel = mongoose.model("notes", noteSchema);

module.exports = notesModel;
