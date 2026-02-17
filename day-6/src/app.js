/**
 * Server create krna
 * Server config krna
 */

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "All Good, You're at home page",
  });
});

module.exports = app;
