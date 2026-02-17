/**
 * Server create krna
 * Server Config krna
 */

const express = require("express");
const notesModel = require("./models/notes.model");
const mongoose = require("mongoose");

const app = express();

// req.body ko read krne ke liye middleware
app.use(express.json());

/**
 * POST API
 * req.body => {title, description}
 */
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  // Note create hota hai, and response me aa jata hai,
  // we saved it in note variable
  const note = await notesModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/**
 * GET API
 * Fetch all the notes
 */
app.get("/notes", async (req, res) => {
  // noteModel.find() => returns an array of all notes
  const notes = await notesModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

module.exports = app;
