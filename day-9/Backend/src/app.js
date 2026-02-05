// This file have two main tasks
// - create server
// - config server

const express = require("express");
// Importing model, so that we can perform CRUD in database
const noteModel = require("./models/note.model");
const cors = require("cors");

// Path
const path = require("path");

const app = express();

app.use(express.static("./public"));
// ye middleware public folder me present sare assets files ko publically available kra deti hai, and now after http://localhost:3000/ ke bad jo bhi ayega woh agar public folder ke bad ke path se match hota hai, like /index.html or /assets.sshshshhshhs.css , or /assets.gstssgssshsjs.js etc toh woh file response me bhej dega, and agar nahi milegi toh obvsouly index.html file bhej dega because its a wildcard

// Enables the CORS request to our server, so that now it can listen to cross-origin requests
app.use(cors());

// Middleware, important if we want to read data of req.body
app.use(express.json());

/*
model ke sare operations asyncronous hote hai, so async await use krte hai.
*/

// POST Api, to create note, create note and save in DataBase
// input data format {title, description}
// APIs ke sare routes (endpoints) hmesha /api/endpoint-name aise hoga

app.post("/api/notes", async (req, res) => {
  // req.body se title or description destructure kiya
  // req.body ka data access krne ke liye middleware use krna pdega express.json() , write app.use(express.json());
  const { title, description } = req.body;

  // database se interact krne ke liye model hi use krte hai.
  // Create a note in the collection
  // ye note create hoga Mongodb ke database pe, and uska ackknowledgement aayega usme kitna time lgega we don't know because it varies with internet speed so, its an async operation, so use async await
  const note = await noteModel.create({ title, description });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// GET API, fetch all notes data from MongoDB and send them in response
// Get all notes

app.get("/api/notes", async (req, res) => {
  // model.find() => model se bne hue collection me saved sare data ko leke aata hai, array of objects ke form me return krta hai
  const notes = await noteModel.find();

  // response me notes ko send kr denge
  res.status(200).json({
    message: "Fetched all notes successfully",
    notes,
  });
});

// DELETE Api, id ki help se note delete krenge.
// Delete a note, using id, which we get through req.params.id
app.delete("/api/notes/:id", async (req, res) => {
  // req.params object me hmare dynamic parameter ki value ayegi id name se
  const id = req.params.id;
  // find by id and delete krta hai, ye _id ko dhundhta hai, and us se connected note ko delete kr deta hai.
  // Postman pe delete rqeust krne pe note delete ho jaega. http://localhost:3000/api/notes/note_id
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// update a note, get id by params, and data by request body
// input data {description}

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  // update krta hai, pahla arg id, dusra wo data jo update krna hai.
  // element me description field me new description data update kr degi

  await noteModel.findByIdAndUpdate(id, { title, description });

  res.status(200).json({
    message: "Note updates successfully",
  });
});

// Wild Card
app.use("*name", (req, res) => {
  // res.send("This is wild card");
  // Ye wild card route pe html file bhej dega
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
  // when html get loaded it requests for js and css file, but don't get it
  // The request for js and css look like these
  // http://localhost:3000/assets/index-C86sZUPU.css
  // http://localhost:3000/assets/index-BRzChCtq.js
  // but its always returning index.html file because we havn't programmeed server to response these routes
  // Thus we have to use one more middleware app.use(express.static('./public'))
  // Ye public folder me present sare data assets ko publically available kr deta hai.
  // means ab //
  // http://localhost:3000/assets/index-C86sZUPU.css
  // http://localhost:3000/assets/index-BRzChCtq.js
  // can be accessed
});

// exporting app, to use in the server.js file
module.exports = app;
