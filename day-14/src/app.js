const express = require("express");
const authRouter = require("./Routes/auth.routes");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser()); // to use cookies

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

module.exports = app;
