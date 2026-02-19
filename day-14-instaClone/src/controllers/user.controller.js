const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    // req.user me decoded aata hai. Jisme token ka decoded data hota hai.
    // {id: user._id, username: user.username}
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // Users ke same toh nahi h??
    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You can not follow yourself",
        });
    }

    // Followee exists krta h ya nahi??
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername,
    });

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User that you are trying to follow does not exists. ",
        });
    }

    // Kahi pahle se follow toh nahi krte ??
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: "You are already following this user.",
            follow: isAlreadyFollowing,
        });
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord,
    });
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (!isUserFollowing) {
        return res.status(200).json({
            message: "You are not following this user.",
        });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`,
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
};
