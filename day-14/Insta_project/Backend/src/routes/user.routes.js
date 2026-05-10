const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

/**
 * POST /api/users/follow/:username [protected]
 * @description Follow User Route
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController);

/**
 * DELETE /api/users/follow/:username [protected]
 * @description Unfollow User route
 */
userRouter.delete("/follow/:username", identifyUser, userController.unfollowUserController);

/**
 * PATCH /api/users/follow/:username/accept [protected]
 * @description Accept follow request route
 */
userRouter.patch("/follow/:username/accept", identifyUser, userController.acceptFollowRequestController);

/**
 * PATCH /api/users/follow/:username/reject [protected]
 * @description Reject follow request route
 */
userRouter.patch("/follow/:username/reject", identifyUser, userController.rejectFollowRequestController);

/**
 * GET /api/users/requests/pending [protected]
 * @description Get pending follow requests route
 */
userRouter.get("/requests/pending", identifyUser, userController.getPendingFollowRequestsController);

/**
 * GET /api/users/followers [protected]
 * @description Get followers route
 */
userRouter.get("/followers", identifyUser, userController.getFollowersController);

/**
 * GET /api/users/following [protected]
 * @description Get following route
 */
userRouter.get("/following", identifyUser, userController.getFollowingController);

module.exports = userRouter;
