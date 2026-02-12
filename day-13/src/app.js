const express = require("express");
const authRouter = require("./routes/auth.routes");
// Cookies ke liye
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser()); // server cookies me ab data rakh paega, and dekh paega

// prefix set kr rhe hai, and api enable kr rhe h.
// http://localhost:3000/api/auth/register
app.use("/api/auth", authRouter);

module.exports = app;
