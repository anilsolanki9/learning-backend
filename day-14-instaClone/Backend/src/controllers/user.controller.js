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

    // Kahi pahle se request toh nahi ki hui hai ??
    const isAlreadyRequested = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (isAlreadyRequested) {
        return res.status(200).json({
            message:
                isAlreadyRequested.status === "pending"
                    ? "Your follow request is pending."
                    : isAlreadyRequested.status === "accepted"
                      ? "You are already following this user."
                      : "Your follow request was rejected.",
            follow: isAlreadyRequested,
        });
    }

    // status default add ho jaega, "pending" is default status.
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `Your follow request to ${followeeUsername} is submitted.`,
        follow: followRecord,
    });
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted",
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

// Ek user ko kon kon followe kr rha hai.
// follower => follow krne wala, followee => jise follow kiya ja rha h.
async function getFollowersController(req, res) {
    const username = req.params.username;

    const followers = await followModel.find({
        followee: username,
        status: "accepted",
    });

    res.status(200).json({
        message: "Followers fetched successfully",
        followers,
    });
}

// Ek user kin kin ko follow kr rha hai.
async function getFolloweesController(req, res) {
    const username = req.params.username;

    const followees = await followModel.find({
        follower: username,
        status: "accepted",
    });

    res.status(200).json({
        message: "Followees fetched successfully",
        followees,
    });
}

// Pending follow requests ko dekhte h.
async function pendingFollowRequestsController(req, res) {
    const username = req.user.username;

    const pendingRequests = await followModel.find({
        followee: username,
        status: "pending",
    });

    res.status(200).json({
        message: "Pending follow requests fetched successfully",
        pendingRequests,
    });
}

// follow request accept krne ke liye.
async function acceptFollowRequestController(req, res) {
    const follower = req.params.follower; // Jiski follow request accept krni hai.
    const followee = req.user.username; // Jo follow request accept kr rha hai.

    const followRequest = await followModel.findOne({
        follower,
        followee,
        status: "pending",
    });

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found.",
        });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    res.status(200).json({
        message: `You have accepted the follow request from ${follower}.`,
        followRequest,
    });
}

// reject follow request.
async function rejectFollowRequestController(req, res) {
    const follower = req.params.follower;
    const followee = req.user.username;

    const followRequest = await followModel.findOne({
        follower,
        followee,
        status: "pending",
    });

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found.",
        });
    }

    await followModel.findByIdAndDelete(followRequest._id);

    res.status(200).json({
        message: `You have rejected the follow request from ${follower}.`,
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
    getFollowersController,
    getFolloweesController,
    pendingFollowRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
};
