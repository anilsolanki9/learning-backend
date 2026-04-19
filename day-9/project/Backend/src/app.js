// Server create and config (API Calls)

const express = require("express");
const noteModel = require("./models/notes.model");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use(cors());

/* -------------------- create a note ------------------- */
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/* -------------------- get all notes ------------------- */
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "All Notes Fetched Successfully",
    notes,
  });
});

/* ------------- update a notes description ------------- */
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const note = await noteModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    {
      returnDocument: "after",
    },
  );

  res.status(200).json({
    message: "Note updates successfully",
    note,
  });
});

/* -------------------- delete a note ------------------- */
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/* ---------------------- wildcard ---------------------- */
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
