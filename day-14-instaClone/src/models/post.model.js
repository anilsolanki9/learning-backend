const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "Image Url is required for creating a POST."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user Id is required to create a post"],
  },
});

/*
// This tells that jo id ayegi wo kis collection se ayegi
// ref: "users",

// and this tells that user store a value of type  Mongoose schema object id
// type: mongoose.Schema.Types.ObjectId,
*/

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
