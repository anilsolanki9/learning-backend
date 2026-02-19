const express = require("express");
const authRouter = require("./routes/auth.routes");
// Cookies ke liye
const cookieParser = require("cookie-parser");

const app = express();

// req.body ko read krne ke liye.
app.use(express.json());

/**
 * server able to set and get cookie data
 * req.cookies -> Get cookies object
 * res.cookie("token", token) -> set a cookie
 */
app.use(cookieParser());

/**
 * prefix set kr rhe hai, and api enable kr rhe h.
 * http://localhost:3000/api/auth/register
 * Now authRouter can be used.
 */
app.use("/api/auth", authRouter);

module.exports = app;
