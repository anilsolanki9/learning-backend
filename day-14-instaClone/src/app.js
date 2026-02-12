const express = require("express");
const authRouter = require("./Routes/auth.routes"); // import the auth router
const postRouter = require("./Routes/post.routes"); // import the post router
const cookieParser = require("cookie-parser");

const app = express(); // server instance

app.use(express.json()); // middleware to parse JSON request bodies
app.use(cookieParser());

app.use("/api/auth", authRouter); // use the auth router for routes starting with /api/auth
app.use("/api/posts", postRouter); // post router

module.exports = app; // export the app instance for use in other files
