const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/**
 * @route POST Follow API -> /api/users/follow/:username
 * username => us user ka username jise hum follow krna chahte hai.
 * @description Description -> follow a user
 * @access -> private
 */
userRouter.post(
    "/follow/:username",
    identifyUser,
    userController.followUserController,
);

/**
 * POST unfollow API -> /api/users/unfollow/:username
 * username => us user ka username jise hum unfollow krna chahte hai.
 * @description Description -> unfollow a user
 * @access -> private
 */
userRouter.post(
    "/unfollow/:username",
    identifyUser,
    userController.unfollowUserController,
);

/**
 * @route GET followers API -> /api/users/:username/followers
 * @description Get All the followers of a user
 * @access -> public
 */
userRouter.get("/:username/followers", userController.getFollowersController);

/**
 * @route GET followees API -> /api/users/:username/followees
 * @description Get All the followees of a user
 * @access -> public
 */
userRouter.get("/:username/followees", userController.getFolloweesController);

/**
 * @route GET pending follow requests API -> /api/users/me/pending-requests
 * @description Get All the pending follow requests for a user
 * @access -> private
 */
userRouter.get(
    "/me/pending-requests",
    identifyUser,
    userController.pendingFollowRequestsController,
);

/**
 * @route POST accept follow request API -> /api/users/accept-request/:follower
 * follower => jiska follow request accept krni hai.
 * @description Accept a follow request
 * @access -> private
 */
userRouter.post(
    "/accept-request/:follower",
    identifyUser,
    userController.acceptFollowRequestController,
);

/**
 * @route POST reject follow request API -> /api/users/reject-request/:follower
 * follower => jiska follow request reject krni hai.
 * @description Reject a follow request
 * @access -> private
 */
userRouter.post(
    "/reject-request/:follower",
    identifyUser,
    userController.rejectFollowRequestController,
);

module.exports = userRouter;
