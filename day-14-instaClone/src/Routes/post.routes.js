const express = require("express");

const postRouter = express.Router(); // post router bnaya

const postsController = require("../controllers/post.controller");

const identifyUser = require("../middlewares/auth.middleware"); // middleware to identify user

const multer = require("multer");

/**
 * multer gives express server a power to read the files comming with client req
 * multer have two types of storage
 * DiskStorage (Saves file in SSD permenenet)
 * MemoryStorage (Saves file temporary at server)
 * we use MemoryStorage and then save the file to an cloud storage provider then get its URL. then server
 * removes the file from its storage  (Less Costly)
 * clous storage providers -> cloudynary, S3, imageKit
 */

const upload = multer({ storage: multer.memoryStorage() }); // memory storage save the file temporary, then we save the file to cloud. Then it gets deleted from server.

/**
 * @route POST API /api/posts/
 * @description This API will be protected, means only users with valid token can access this,
 * otherwise we return 404 anauthorized access
 * req.body = {caption, imgFile}
 * upload.single("image"), yaha image ki jagah koi bhi nam aa skta hai, wohi name jis se file client side se aa rhi hai.
 */
postRouter.post(
    "/",
    upload.single("image"),
    identifyUser,
    postsController.createPostController,
); // here image is the name by which user sends the file from frontend

/**
 * @route GET API -> /api/posts/
 * @description GET All posts by the user who is requesting.
 */
postRouter.get("/", identifyUser, postsController.getPostController);

/**
 * @route GET api, /api/posts/details/:postId
 * @description Get details of a post, like caption, image url, user details etc
 * also check whether the user requesting is the owner of the post or not,
 * if not then return unauthorized access
 */
postRouter.get(
    "/details/:postid",
    identifyUser,
    postsController.getPostDetailsController,
);

/**
 * @route POST Like api -> /api/posts/like/:postId
 * @description Like a post, with id provided in params.
 * @access private
 */
postRouter.post(
    "/like/:postid",
    identifyUser,
    postsController.likePostController,
);

module.exports = postRouter;
