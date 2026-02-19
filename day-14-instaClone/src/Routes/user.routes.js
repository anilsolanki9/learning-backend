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

module.exports = userRouter;
