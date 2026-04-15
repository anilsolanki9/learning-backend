const express = require("express");

const app = express(); // creates an server instance

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
