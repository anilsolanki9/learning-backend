const express = require("express");
const app = express();
app.use(express.json());

const notes = [];

// To create a new note
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Note created successfully",
  });
});

// To get all the notes
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

// To delete a note
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.status(204).json({
    message: "Note deeted succesfully",
  });
});

// To delete a note partially only description
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message: "Note updates succesfully",
  });
});

module.exports = app;
