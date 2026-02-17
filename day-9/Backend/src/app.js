/**
 * This file have two main tasks
 * create server
 * config server
 */

const express = require("express");

// Importing model, so that we can perform CRUD in database
const noteModel = require("./models/note.model");
const cors = require("cors");

// Path get krne ke liye,path.join() vgrh use krne ke liye,
// wildcard me use krte hai.
const path = require("path");

const app = express();

/**
 * This middleware make everything inside public folder, available publically.
 * All assets inside public/ can be accessed by provifing name after url of website.
 * eg. http://localhost:3000/index.html
 */
app.use(express.static("./public"));

/**
 * Enables the CORS request to our server,
 * so that now it can listen to cross-origin requests
 */
app.use(cors());

// Middleware, important if we want to read data of req.body
app.use(express.json());

/*
model ke sare operations asyncronous hote hai, so async await use krte hai.
*/

/**
 * POST Api, to create note, and save in DataBase
 * req.body data format {title, description}
 * APIs ke sare routes (endpoints) hmesha /api/endpoint-name aise rkhte hai
 */
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

/**
 * GET API, fetch all notes data from MongoDB and send them in response
 * Get all notes
 *  model.find() => model se bne hue collection me saved sare data ko leke aata hai, array of objects ke form me return krta hai
 */
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  // response me notes ko send kr denge
  res.status(200).json({
    message: "Fetched all notes successfully",
    notes,
  });
});

/**
 * DELETE Api, id ki help se note delete krenge.
 * Delete a note, using id, which we get through req.params.id
 * endpoint -> http://localhost:3000/api/notes/note_id
 */
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  // find and delete the note whose id ===  _id of resource.
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/**
 * update a note, get id by params, and data by request body
 * input data {title, description}
 */
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  await noteModel.findByIdAndUpdate(id, { title, description });

  res.status(200).json({
    message: "Note updates successfully",
  });
});

/**
 * Wild Card,
 * koi bhi unknown path jaha resource na ho, toh index.html file chali jaegi.
 * __dirname => Ye jis file me use kiya ja rha hai, woh jis folder ke andr hai. Us folder tak ka address. for app.js -> /Backend/src/ tak ka path ayega.
 * .. => one level above => Backend/
 */
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

/**
 * when html get loaded it requests for js and css file, but don't get it
 * The request for js and css look like these
 * http://localhost:3000/assets/index-C86sZUPU.css
 * http://localhost:3000/assets/index-BRzChCtq.js
 * but it returns index.html file
 * because we havn't programmeed server to response these routes
 * Thus we have to use one more middleware app.use(express.static('./public'))
 * Ye public folder me present sare data assets ko publically available kr deta hai.
 * means ab
 * http://localhost:3000/assets/index-C86sZUPU.css
 * http://localhost:3000/assets/index-BRzChCtq.js
 * can be accessed
 */

// exporting app, to use in the server.js file
module.exports = app;
