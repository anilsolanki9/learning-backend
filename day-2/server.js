// We can use import also (Its newer), but for now we will use require()
const express = require("express");

const app = express(); // creates an server instance
// Ab tk server sirf create hua hai. Run nahi

// GET API -> on http://localhost:3000/   endpoint
// Generally used for HOME Page
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Get api for endpoint -> http://localhost:3000/about
app.get("/about", (req, res) => {
  res.send("About Page");
});

// GET Api for endpoint -> http://localhost:3000/offers
app.get("/offers", (req, res) => {
  res.send("Offers Page");
});

// Starts a server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port:3000");
});

// node server.js // starts the execution but server dont get restart automatically on code updation so we use
// npx nodemon server.js
