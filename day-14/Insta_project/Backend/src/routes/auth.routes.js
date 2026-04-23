const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

/**
 * POST /api/auth/register
 * @param username, email, password, bio, profileImage
 */
 
authRouter.post("/register", authController.registerController);

/**
 * GET /api/auth/get-me
 * @param token, return userDetails
 */

authRouter.get("/get-me", authController.getMeController);

/**
 * POST /api/auth/login
 * @param email, username, password
 */

authRouter.post("/login", authController.loginController);

module.exports = authRouter;
