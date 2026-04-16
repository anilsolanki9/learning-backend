// create server
// config server

const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created sucessfullt",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Fetched all notes",
    notes,
  });
});

// new : true, it make sures that the note which findByIdAndUpdate() returns is latest note, and not previous
app.patch("/notes/:id", async (req, res) => {
  const { description } = req.body;

  const note = await noteModel.findByIdAndUpdate(
    req.params.id,
    {
      description,
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    message: "Note updates successfully",
    note,
  });
});

app.delete("/notes/:id", async (req, res) => {
  await noteModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    message: "Note deleted successfully",
  });
});

module.exports = app;
