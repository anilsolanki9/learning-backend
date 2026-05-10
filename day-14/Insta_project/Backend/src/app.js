const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routers
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

const app = express(); // Create an Express application

app.use(express.json());
app.use(cookieParser());
// credentials: true allows the server to accept cookies from the frontend
// origin specifies the allowed origin for cross-origin requests
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// Using the routers for different API endpoints
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
