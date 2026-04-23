const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username must be unique."],
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    unique: [true, "Email must be unique."],
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/qjg20t8q6/default-avatar-icon-of-social-media-user-vector.jpg?updatedAt=1770788524080",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
