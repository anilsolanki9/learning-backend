const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * POST /api/auth/register
 * @param username, email, password, bio, profileImage
 */

authRouter.post("/register", authController.registerController);

/**
 * POST /api/auth/login
 * @param email, username, password
 */

authRouter.post("/login", authController.loginController);

/**
 * GET /api/auth/get-me
 * @param token, return userDetails
 */

authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter;
