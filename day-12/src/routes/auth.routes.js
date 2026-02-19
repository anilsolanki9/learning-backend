// Iske andr register API bnaenge, and yaha se hum export krke app.js me use rkr lenge

const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// authRouter ki help se him app.js ke alava kisi bhi other file me API create kar skte hai.
const authRouter = express.Router();

/**
 * Register API
 * /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // findOne() finds the database resource by some condition,like email
  const isUserAlreadyExists = await userModel.findOne({ email });

  // Is user already exists then early return,
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists with this email address.",
    });
  }

  // save user data in DB, and store the document in user constant
  const user = await userModel.create({
    name,
    email,
    password,
  });

  /**
   * Creating a token, and signing it with JWT_SECRET
   * Is token me user ka data store rahta hai.
   * Generally sirf _id dete hai
   */
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  /**
   * Store token in cookie storage of client. cookies is an object.
   * cookies me token name ki property me token save ho jaega.
   */
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered.",
    user,
    token,
  });
});

module.exports = authRouter;
