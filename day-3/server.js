const express = require("express");

const app = express();

const notes = [];
/* notes format will be like
{
  title: "Test title 1",
  description: "Test description 1",
}
*/

/**
 * Data from client to server comes in req.body
 * By default server can't read data of req.body, so we use a middleware `express.json()`
 */
app.use(express.json());

/**
 * Api endpoint for client to create a note
 * POST API
 * endpoint -> http://localhost:3000/notes
 * req.body me data, JSON format me aata hai
 * {
 *    "title": "note title",
 *    "description":"note description",
 * }
 */

app.post("/notes", (req, res) => {
  notes.push(req.body); // req.body me aane vale data ko
  res.send("Note created sucesfully");
});

/**
 * Api endpoint for client to get all notes
 * GET API
 * endpoint -> http://localhost:3000/notes
 */

app.get("/notes", (req, res) => {
  res.send(notes);
});

// App server starts on port 3000
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
