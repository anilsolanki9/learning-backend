const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express(); // server instance created

app.use(express.json()); // middleware to parse JSON request bodies

app.use(cookieParser()); // middleware to parse cookies from incoming requests, making them available in req.cookies

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
); // middleware to enable cors requests

/**
 * Routes require
 */
const authRouter = require("./Routes/auth.routes");
const postRouter = require("./Routes/post.routes");
const userRouter = require("./Routes/user.routes");

/**
 * Use Routes
 */
app.use("/api/auth", authRouter); // use the auth router for routes starting with /api/auth
app.use("/api/posts", postRouter); // post router for routes starting with /api/posts
app.use("/api/users", userRouter); // user Router for edge colections apis.

module.exports = app; // export the app instance for use in other files
