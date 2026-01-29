const express = require("express");
const app = express();
// middelware because express server can't read the content comming inside request body
app.use(express.json());
// Home page get rule
app.get("/", (req, res) => {
  res.send("Hello World");
});
// Notes ki array
const notes = [];
/*
notes ka structure aisa hoga
{
  title:"Test title 1",
  description: "Test descrption 1"
}
*/
// User add a note using post method
app.post("/notes", (req, res) => {
  // req.body contains all incomming data
  notes.push(req.body);
  res.send("Note created successfully");
});
// get all notes
app.get("/notes", (req, res) => {
  res.send(notes);
});
// delete a note
app.delete("/notes/:index", (req, res) => {
  // :index ek dynamic endpoint hai, ye value req.params object ke andr aati hai, and because we are using :index thus property name will be index, access using req.params.index
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
