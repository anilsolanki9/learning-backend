/**
 * This file have two main tasks
 * create server
 * config server
 */

const express = require("express");

const noteModel = require("./models/note.model");
const cors = require("cors");

// Root directory se Absolute Path chahiye? => use => path.join()
// wildcard me use krte hai, taki index.html file ka root se path de ske,
const path = require("path");

const app = express();

/**
 * This middleware make everything inside public folder, available publically.
 * All assets inside public/ can be accessed by providing name after url of website.
 * eg. http://localhost:3000/index.html
 */
app.use(express.static("./public"));

app.use(cors()); // Enable CORS request

app.use(express.json()); // Enable reading of req.body

/**
 * POST Api, to create note, and save in DataBase
 * req.body data format {title, description}
 * APIs ke sare routes (endpoints) hmesha /api/endpoint-name aise rkhte hai
 */
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/**
 * GET API, fetch all notes data from MongoDB and send them in response
 * Get all notes
 *  model.find() => model se bne hue collection me saved sare data ko leke aata hai, array of objects ke form me return krta hai
 */
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Fetched all notes successfully",
    notes,
  });
});

/**
 * DELETE Api, id ki help se note delete krenge.
 * Delete a note, using id, which we get through req.params.id
 * endpoint -> http://localhost:3000/api/notes/note_id
 */
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  // find and delete the note whose id ===  _id of resource.
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/**
 * update a note, get id by params, and data by request body
 * input data {title, description}
 */
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  await noteModel.findByIdAndUpdate(id, { title, description });

  res.status(200).json({
    message: "Note updates successfully",
  });
});

// WildCard for providing Index.js on random endpoint
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
