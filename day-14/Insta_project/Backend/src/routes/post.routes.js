const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/posts/ [protected]
 * req.body -> {caption, imgUrl}
 * "" me wo nam likho, jis name se frontend se file upload ho rhi h. (Inp name)
 */

postRouter.post("/", upload.single("imgUrl"), postController.createPostController);

module.exports = postRouter;
