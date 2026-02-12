const express = require("express");
const authRouter = express.Router(); // Create a router
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken"); // install krna pdega
const crypto = require("crypto"); // download krne ki jrurat nahi h
const { decode } = require("punycode");

// To hit this api we have to hit /api/auth/register
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  // is user exist then return
  if (isUserExist) {
    return res.status(409).json({
      message: "User already exist with this email",
    });
  }

  // if not present then creates a user
  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  //   creates a token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token); // token saved in cookies by name token

  res.status(201).json({
    message: "User registered Successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

// get token
authRouter.post("/get-me", async (req, res) => {
  // get the token from request
  const token = req.cookies.token;

  // varifies the token is created by our server or other?
  // agar token sahi hoga toh , jo data humne token bnate time diya tha woh mil jaega
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decoded);
  const user = await userModel.findById(decoded.id);
  res.json({
    name: user.name,
    email: user.email,
  });
});

// api/auth/login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(409).json({
      message: "User dont exist",
    });
  }

  //   convert the password to hash
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hash === user.password;

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Wrong password entered",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.json({
    message: "User logges in successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = authRouter;
