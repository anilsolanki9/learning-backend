const express = require("express");
const postRouter = express.Router();

const postsController = require("../controllers/post.controller");

const multer = require("multer");

// multer gives express server a power to read the files comming from frontend
// multer have two types of storage
// - DiskStorage (Saves file in SSD permenenet)
// - MemoryStorage (Saves file temporary at server)
// - we use MemoryStorage and then save the file to an cloud storage provider then get its URL. then server removes the file from its storage  (Less Costly)
// clous storage providers -> cloudynary, S3, imageKit

const upload = multer({ storage: multer.memoryStorage() });

/*
POST API
/api/posts/  
this API will be protected, means only users with token can request this, otherwise we return 404 anauthorized access

req.body = {caption, imgFile}



*/

postRouter.post("/", upload.single("image"), postsController.createPostController); // here image is the name by which user sends the file from frontend

module.exports = postRouter;
