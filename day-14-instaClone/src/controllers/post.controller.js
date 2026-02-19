const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * frontend se backend pe file bhejne ke liye -> form-data format me jaata hai
 * by default files nahi padh skta express ka server,
 * files padhne ke liye hum multer use krte hai.
 * we have to recieve the image file, then send it to imageKit, then get its url then save the url to database to create a post. files are
 */

//

// Post controller
async function createPostController(req, res) {
    /**
     * console.log(req.body);
     * console.log(req.file); // file comes in this {.......}. // jisme buffer is the actual file content
     */

    // Yaha pe identify user ka code tha jo humne authMiiddleware me shift kr diya

    // imagekit pe file upload, and get its cloud location details (url, thumbnaile etc)
    // imagekit pe folders me image store krne ke liye folder property use krte h...
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts",
    });

    // creating and saving post in db
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id,
    });

    res.status(201).json({
        message: "Post created sucessfully.",
        post,
    });
}

// get all posts by user controller
async function getPostController(req, res) {
    const userId = req.user.id;

    /**
     * sare posts leke aao, jinko is user ne create kiya ho
     * posts => Array of objects format me hoga
     */
    const posts = await postModel.find({ user: userId });

    res.status(200).json({
        message: "Posts fetched successfully",
        posts,
    });
}

// get details of a post
async function getPostDetailsController(req, res) {
    let userId = req.user.id;
    const postId = req.params.postid;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found",
        });
    }

    /**
     * we can check in two ways. as these are object id so we can'y compare them directly.
     * 1. post.user.toString() === userId
     * 2. post.user.equals(userId) // this is the best way to compare two object id
     */

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content",
        });
    }

    return res.status(200).json({
        message: "Post details fetched successfully",
        post,
    });
}

// like a post controller
async function likePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postid;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found",
        });
    }

    const like = await likeModel.create({
        post: postId,
        user: username,
    });

    res.status(201).json({
        message: "Post liked successfully.",
        like,
    });
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
};
