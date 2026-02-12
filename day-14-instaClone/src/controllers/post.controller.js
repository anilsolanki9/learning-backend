const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// frontend se backend pe file bhejne ke liye -> form-data format me jaata hai

// by default files nahi padh skta express ka server,
// files padhne ke liye hum multer use krte hai.

// we have to recieve the image file, then send it to imageKit, then get its url then save the url to database to create a post.
// files are

// github.com/ankurio/difference-backend-video

async function createPostController(req, res) {
  // console.log(req.body);
  // console.log(req.file); // file comes in this {.......}

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  res.send(file);
}

module.exports = { createPostController };
