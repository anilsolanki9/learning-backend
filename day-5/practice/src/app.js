// create server
// config server

const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "Note created successfully",
    notes: notes,
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Fetched all notes successfully.",
    notes,
  });
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.status(204).json({
    message: "Note deleted successfully",
  });
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message: "Note created successfully",
    notes,
  });
});

module.exports = app;
