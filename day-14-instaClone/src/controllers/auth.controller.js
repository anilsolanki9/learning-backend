const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  // first check if the user with the given data already exists in the database, username and email was unique so we will check for both of them
  const isUserExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  // if the user already exists then we will send a response back to the client with a message that the user already exists
  if (isUserExist) {
    return res.status(409).json({
      message: `User already exist ${isUserExist.email === email ? "with this email." : "with this user."}`,
    });
  }

  // encrypt the password using sha256 algorithm and store the hash in the database
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  // if the user does not exist then we will create a new user in the database
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  // after creating the user we will generate a JWT token for the user and send it back to the client in the response
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // set the token in the cookie
  res.cookie("token", token);

  // send the response back to the client with the user data
  res.status(201).json({
    message: "User registered successfully.",
    user: {
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  // first check if the user with the given data already exists in the database, username and email was unique so we will check for both of them
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(404).json({
      message: `User not found with this ${email ? "email." : "username."}`,
    });
  }

  // is user exist then we will compare the password with the hash stored in the database
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hash === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password.",
    });
  }

  // If the password is valid
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // set the token in the cookie
  res.cookie("token", token);

  // send the response back to the client with the user data
  res.status(200).json({
    message: "User logged in successfully.",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
