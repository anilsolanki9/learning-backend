const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/*
// frontend se backend pe file bhejne ke liye -> form-data format me jaata hai

// by default files nahi padh skta express ka server,
// files padhne ke liye hum multer use krte hai.

// we have to recieve the image file, then send it to imageKit, then get its url then save the url to database to create a post.
// files are
*/

// github.com/ankurio/difference-backend-video

async function createPostController(req, res) {
  // console.log(req.body);
  // console.log(req.file); // file comes in this {.......}

  const token = req.cookies.token;
  // if token not found means wither -> user don't exist or user is logout

  if (!token) {
    return res.status(401).json({
      message: "Token not ptovided, Unauthorized access.",
    });
  }

  // If token is wrong then jwt.varify throw an error directly .. so to create our own custom response and not the error, we use try catch

  let decoded = null; // because we have to change it inside try block, and have to use it outside try block

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "User is not authorized, token is wrong",
    });
  }

  // console.log(decoded); // we get the data we provided while creating token
  // { id: '698f224ab9378bc333d7abb0', iat: 1770988106, exp: 1771074506 }
  // imagekit pe folders me image store krne ke liye folder property use krte h...

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created sucessfully.",
    post,
  });
}

module.exports = { createPostController };
