// Iske andr register API bnaenge, and yaha se hum export krke app.js me use rkr lenge

const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
// Password hashing ke liye
const crypto = require("crypto");

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

  // Is user already exists then early return, and show error message in response.
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists with this email address.",
    });
  }

  /**
   * Hashing the password, to prevent access of real password to hacker
   * If data breach happen by chance,
   */
  const hash = crypto.createHash("md5").update(password).digest("hex");

  // save user data in DB, and store the document in user constant
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  /**
   * Creating a token, and signing it with JWT_SECRET
   * Is token me user ka data store rahta hai.
   * Generally sirf _id dete hai
   */
  const token = jwt.sign(
    {
      id: user._id,
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
  });
});

/**
 * Dummy API, to view cookies
 * /api/auth/protected
 */
authRouter.post("/protected", (req, res) => {
  // accessing cookies object
  const cookies = req.cookies;
  res.status(200).json({
    cookies: cookies,
  });
});

/**
 * Login API
 * /api/auth/login
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // user ko database se dhhondh ke user constant me save kr liya
  const user = await userModel.findOne({ email });

  // If user dont exist then, return status 404
  if (!user) {
    return res.status(404).json({
      message: "There is no user with this email address.",
    });
  }

  // password matching logic
  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  // agar password nahi match kr rhe, then return status 401
  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Password is not correct.",
    });
  }

  /**
   * agar password shi hoga tabhi yha pe execution ayega,
   * new token create hoke, user ke browser me us tab ke cookies storage me store ho jaega
   */
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  // cookies stored in cookie storage
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
});

module.exports = authRouter;
