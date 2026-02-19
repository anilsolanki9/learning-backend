const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * Reister API
 * Post /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "User already exists with this email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token); // Set the token in a cookie

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

/**
 * Dummy APi to get user info from token
 * /api/auth/get-me
 */
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  // if token is correct, then token is decoded and its data is stored
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "User detailes fetched successfully.",
    user,
  });
});

/**
 * Login API, new token banta h
 * /api/auth/login
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(409).json({
      message: "User dont exists with this email",
    });
  }

  const isPasswordValid =
    user.password ===
    crypto.createHash("sha256").update(password).digest("hex");

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User logged in successfully.",
    user,
  });
});

module.exports = authRouter;
