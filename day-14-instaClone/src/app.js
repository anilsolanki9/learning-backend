const express = require("express");
const authRouter = require("./Routes/auth.routes"); // import the auth router
const cookieParser = require("cookie-parser");

const app = express(); // server instance

app.use(express.json()); // middleware to parse JSON request bodies
app.use("/api/auth", authRouter); // use the auth router for routes starting with /api/auth
app.use(cookieParser());

module.exports = app; // export the app instance for use in other files
