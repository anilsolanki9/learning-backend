// Iske andr register API bnaenge, and yaha se hum export krke app.js me use rkr lenge
const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // for Password hashing, to prevent hacker access to users accounts after data breach

// authRouter ki help se him app.js, or other routes file me API create kar skte hai.
const authRouter = express.Router();

/**
 * Register API
 * /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email }); // find the db resource on condition email matches.

  // If user already exists then early return, and show error message in response.
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

  // token creation, token has user data in it(generally only _id)
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token); // store token in cookie storage of client. cookies is an object.

  res.status(201).json({
    message: "User registered.",
    user,
  });
});

/**
 * Dummy API, to view cookies
 * endpoint -> /api/auth/protected
 */
authRouter.post("/protected", (req, res) => {
  const cookies = req.cookies; // accessing cookies object
  res.status(200).json({ cookies }); // send the cookies object in response.
});

/**
 * Login API
 * @params > email, password
 * @returns > user data, token
 * endpoint -> /api/auth/login
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }); // find the db resource on condition email

  // If user dont exist then, return status 404 and show error message in response.
  if (!user) {
    return res.status(404).json({
      message: "There is no user with this email address.",
    });
  }

  // password matching logic, compare the hashed password with the password in the database
  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  // If password does not match, then return status 401 and show error message in response.
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
