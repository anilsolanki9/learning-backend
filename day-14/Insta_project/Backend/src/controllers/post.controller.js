const postRouter = require("../routes/post.routes");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../model/post.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access.",
    });
  }

  let decoded; // let because we will update it, Outside try because we wanna use it in the func
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access, Token is invalid",
    });
  }

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
    fileName: req.file.originalname,
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post: post,
  });
}

module.exports = {
  createPostController,
};
