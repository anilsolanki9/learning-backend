/**
 * This file have two main tasks
 * Server create krna
 * Server config krna
 */
const express = require("express");

const app = express(); // creates an server instance

app.use(express.json()); // using middleware to read req.body data

const notes = [];
/**
 * notes array, it saves objects elements in javascript object form.
 *  express.json() middleware incomming JSON format data ko parse krke js object bna deta hai.
 */

/**
 * To create a new note
 * POST method, endpoint -> http://localhost:3000/notes
 * req.body contains the data {"title": "...", "description": "..."}
 */
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Note created successfully",
  });
});

/**
 * To get all the notes
 * GET Method, endpoint -> http://localhost:3000/notes
 */
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

/**
 * To delete a note
 * DELETE method,endpoint -> http://localhost:3000/notes/:index
 * req.params contains the dynamic index value.
 */
app.delete("/notes/:index", (req, res) => {
  // delete makes the value at index => `null`
  delete notes[req.params.index];

  res.status(204).json({
    message: "Note deleted succesfully",
  });
});

/**
 * To update a note partially only description
 * PATCH method, endpoint -> http://localhost:3000/notes/:index
 * req.params contains the dynamic index value.
 */
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message: "Note updates succesfully",
  });
});

module.exports = app;
