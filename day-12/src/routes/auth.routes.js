// Iske andr register API bnaenge, and yaha se hum export krke app.js me use rkr lenge

const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// authRouter ki help se him app.js ke alava kisi bhi other file me API create kar skte hai.
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // find one finds the database resource based on some field,like email
  const isUserAlreadyExists = await userModel.findOne({ email });

  // Is user already exists then early return, and show error message in response.
  if (isUserAlreadyExists) {
    // Task -> Status code 400 jaega ya 409
    return res.status(400).json({
      message: "User already exists with this email address.",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  // generally sirf id dete hai
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registered.",
    user,
    token,
  });
});

module.exports = authRouter;
