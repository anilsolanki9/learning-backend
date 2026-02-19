const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookiesParser = require("cookie-parser");

const app = express(); // server instance created

app.use(express.json()); // to read req.body data

app.use(cookiesParser()); // to read cookies data

app.use("/api/auth", authRouter); // Router for auth

module.exports = app;
