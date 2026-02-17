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

/**
 * User add a note using post method
 * POST method, endpoint -> http://localhost:3000/notes
 * Data comes in req.body {"title":"...", "description": "..."}
 */
app.post("/notes", (req, res) => {
  // req.body contains all incomming data
  notes.push(req.body);
  res.send("Note created successfully");
});

/**
 * get all notes
 * GET method, endpoint -> http://localhost:3000/notes
 */
app.get("/notes", (req, res) => {
  res.send(notes);
});

/**
 * Delete API to delete a note
 * DELETE Method, endpoint -> http://localhost:3000/notes/:index
 * :index ek dynamic endpoint hai,
 * ye value `req.params` object ke andr aati hai,
 * and because we are using :index thus property name will be index, access using `req.params.index`
 * For now, index me hum index bhejenge, but in real development, we use document unique id => _id
 */
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
