const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/offers", (req, res) => {
  res.send("Offers Page");
});

app.listen(3000, () => {
  console.log("Server is running on port:3000");
});

// node server.js // starts the execution but server dont get restart automatically on code updation so we use
// npx nodemon server.js
