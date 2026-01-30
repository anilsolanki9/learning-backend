const express = require('express');
const notesModel = require('./models/notes.model');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// POST API
app.post('/notes', async (req, res) => {
  const { title, description } = req.body;

  const note = await notesModel.create({ title, description });

  res.status(201).json({
    message: 'Note created successfully',
    note,
  });
});

// GET API
app.get('/notes', async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: 'Notes fetched successfully',
    notes,
  });
});

module.exports = app;
