const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
            required: [true, "PostId is required for creating a like."],
        },
        user: {
            type: String,
            required: [true, "Username is required for creating a like."],
        },
    },
    {
        timestamps: true,
    },
);

// compound index to ensure a user can like a post only once
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
