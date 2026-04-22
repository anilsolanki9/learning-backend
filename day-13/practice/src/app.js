const express = require("express");
const authRouter = require("./routes/auth.routes");

const cookieParser = require("cookie-parser"); // for cookies access, req.cookies -> Get cookies object, res.cookie("token", token) -> set a cookie

const app = express();

app.use(express.json()); // req.body ko read krne ke liye.
app.use(cookieParser()); // using cookie parser middleware to access cookies

/**
 * prefix set kr rhe hai, and api enable kr rhe h.
 * http://localhost:3000/api/auth/register
 * Now authRouter can be used.
 */
app.use("/api/auth", authRouter);

module.exports = app;
