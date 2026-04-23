const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, bio } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: `User already exists with this ${isUserAlreadyExists.email === email ? "email" : "username"}`,
    });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    bio,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const getMeController = async (req, res) => {
  const token = req.cookies.token;

  const isUserExists = jwt.verify(token, process.env.JWT_SECRET);

  if (!isUserExists) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  const user = await userModel.findById(isUserExists.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const loginController = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email or username",
    });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (user.password !== hashPassword) {
    return res.status(401).json({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully.",
  });
};

module.exports = { registerController, getMeController, loginController };
