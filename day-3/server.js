const express = require("express");

const app = express();

const notes = [];

app.use(express.json()); // middleware to read data of req.body

// home page
app.get("/", (req, res) => {
  res.send("Notes Home Page");
});

// Notes creation endpoint
app.post("/notes", (req, res) => {
  notes.push(req.body); // req.body me aane vale data ko
  res.send(notes); // ye response me jaega
});

// Fetch all notes endpoint
app.get("/notes", (req, res) => {
  res.send(notes); // response
});

// Update note
app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].description = req.body.description;
  res.send(notes);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  notes.splice(req.params.id, 1);
  res.send(notes);
});

// server start
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
