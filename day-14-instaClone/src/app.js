const express = require("express");
const authRouter = require("./Routes/auth.routes");
const postRouter = require("./Routes/post.routes");
const cookieParser = require("cookie-parser");

const app = express(); // server instance created

app.use(express.json()); // middleware to parse JSON request bodies
app.use(cookieParser()); // middleware to parse cookies from incoming requests, making them available in req.cookies

app.use("/api/auth", authRouter); // use the auth router for routes starting with /api/auth
app.use("/api/posts", postRouter); // post router for routes starting with /api/posts

module.exports = app; // export the app instance for use in other files
