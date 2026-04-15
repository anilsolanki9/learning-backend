/**
 * server create krna
 * server config krna
 */

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send(notes);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("Note deleted successfully");
});

// Update a note partially means only description update
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send("Note updates succesfully");
});

// exporting the app to start inside server.js
module.exports = app;
