const postRouter = require("../routes/post.routes");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../model/post.model");
const likeModel = require("../model/like.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const userId = req.user.id; // decoded => { id: "user_id" }

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
    fileName: req.file.originalname,
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: userId,
  });

  res.status(201).json({
    message: "Post created successfully",
    post: post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  // Request krne vale user ki sari posts
  const posts = await postModel.find({
    user: userId,
  });

  return res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Resource not found.",
    });
  }

  // post.user => ObjectId("user_id")
  const isValidUser = post.user.equals(userId);
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content access",
    });
  }

  return res.status(200).json({
    message: "Post details fetched",
    post: post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post you want to like does not exists.",
    });
  }

  const isAlreadyLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });
  if (isAlreadyLiked) {
    return res.status(200).json({
      message: "You have already liked this post.",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  return res.status(200).json({
    message: "Post liked successfully",
    like,
  });
}

async function dislikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post you want to dislike does not exists.",
    });
  }

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });
  if (!isLiked) {
    return res.status(400).json({
      message: "You have not liked this post.",
    });
  }

  await likeModel.findByIdAndDelete(isLiked._id);

  return res.status(200).json({
    message: "Post disliked successfully",
  });
}

// Populate meke user id convert to user data in post. 
// lean() to convert mongoose document to js object.
async function getFeedController(req, res) {
  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        post: post._id,
        user: req.user.username,
      });

      return { ...post, isLiked: !!isLiked };
    }),
  );

  res.status(200).json({
    message: "Feed Posts fetched successfully.",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetails,
  likePostController,
  dislikePostController,
  getFeedController,
};
