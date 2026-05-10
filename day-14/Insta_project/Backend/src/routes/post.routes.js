const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");
const likeModel = require("../model/like.model");

/**
 * POST /api/posts/ [protected]
 * req.body -> {caption, imgUrl}
 * "" me wo nam likho, jis name se frontend se file upload ho rhi h. (Inp name)
 */
postRouter.post("/", upload.single("imgUrl"), identifyUser, postController.createPostController);

/**
 * GET /api/posts [protected]
 * User gets all the posts created by himself.
 */
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * GET /api/posts/feed
 * @description get all the posts created in the DB
 * @access private [All logges in users only]
 */
postRouter.get("/feed", identifyUser, postController.getFeedController);

/**
 * GET /api.posts/:postId
 * Returne the details of post with id = postId,
 * Also checks the post is created by the requesting user or not. If he is not the creator then we return unauthorized access response.
 */
postRouter.get("/:postId", identifyUser, postController.getPostDetails);

/**
 * POST /api/posts/:postId/like [protected]
 * Like
 */
postRouter.post("/:postId/like", identifyUser, postController.likePostController);

/**
 * DELETE /api/posts/:postId/like [protected]
 * Unlike
 */
postRouter.delete("/:postId/like", identifyUser, postController.dislikePostController);

module.exports = postRouter;
