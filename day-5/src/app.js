/**
 * This file have two main tasks
 * Server create krna
 * Server config krna
 */
const express = require("express");

const app = express(); // creates an server instance

app.use(express.json()); // using middleware to read req.body data

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Note created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.delete("/notes/:index", (req, res) => {
  // delete makes the value at index => `null`
  delete notes[req.params.index];

  res.status(204).json({
    message: "Note deleted succesfully",
  });
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message: "Note updates succesfully",
  });
});

module.exports = app;
