/**
 * Server create krna
 * Server Config krna
 */

const express = require("express");
const mongoose = require("mongoose");
const notesModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await notesModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find(); // returns an array of all notes

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

module.exports = app;
