const followModel = require("../model/follow.model");
const userModel = require("../model/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself.",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: `User with username ${followeeUsername} does not exist.`,
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You already follow the user : ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  return res.status(200).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot unfollow yourself.",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: `User with username ${followeeUsername} does not exist.`,
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowing) {
    return res.status(400).json({
      message: `You are not following the user: ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete({
    _id: isFollowing._id,
  });

  return res.status(200).json({
    message: `You are no longer following ${followeeUsername}`,
  });
}

async function acceptFollowRequestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot accept a follow request from yourself.",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExists) {
    return res.status(404).json({
      message: `User with username ${followeeUsername} does not exist.`,
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });
  if (!followRequest) {
    return res.status(404).json({
      message: `Follow request from ${followerUsername} to ${followeeUsername} not found.`,
    });
  }

  followRequest.status = "accepted";
  await followRequest.save();

  return res.status(200).json({
    message: `You have accepted the follow request from ${followerUsername}`,
  });
}

async function rejectFollowRequestController(req, res) {
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot reject a follow request from yourself.",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExists) {
    return res.status(404).json({
      message: `User with username ${followeeUsername} does not exist.`,
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });
  if (!followRequest) {
    return res.status(404).json({
      message: `Follow request from ${followerUsername} to ${followeeUsername} not found.`,
    });
  }

  await followModel.findByIdAndDelete({
    _id: followRequest._id,
  });

  return res.status(200).json({
    message: `You have rejected the follow request from ${followerUsername}`,
  });
}

async function getPendingFollowRequestsController(req, res) {
  const followeeUsername = req.user.username;

  const pendingRequests = await followModel.find({
    followee: followeeUsername,
    status: "pending",
  });

  return res.status(200).json({
    message: `Pending follow requests for ${followeeUsername}`,
    requests: pendingRequests,
  });
}

async function getFollowersController(req, res) {
  const followeeUsername = req.user.username;

  const followers = await followModel.find({
    followee: followeeUsername,
    status: "accepted",
  });

  return res.status(200).json({
    message: `Followers of ${followeeUsername}`,
    followers: followers,
  });
}

async function getFollowingController(req, res) {
  const followerUsername = req.user.username;

  const following = await followModel.find({
    follower: followerUsername,
    status: "accepted",
  });

  return res.status(200).json({
    message: `Users that ${followerUsername} is following`,
    following: following,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getPendingFollowRequestsController,
  getFollowersController,
  getFollowingController,
};
