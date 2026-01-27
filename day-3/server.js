const express = require("express");

const app = express();

const notes = [];
/* notes format will be like
{
  title: "Test title 1",
  description: "Test description 1",
}
*/

// Api endpoint to create a note
// incomming data is stored in request body means req.body
// By default the server made using express can't read data of req.body, so we use a middleware
app.use(express.json());

// Api endpoint for client to create a note
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("Note created sucesfully");
});

// Api endpoint for client to get all notes
app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
