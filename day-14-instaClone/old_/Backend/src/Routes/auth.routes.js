const express = require("express");
const authControllers = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

// route for user registration, /api/auth/register
authRouter.post("/register", authControllers.registerController);

// route for user login, /api/auth/login
authRouter.post("/login", authControllers.loginController);

/**
 * @route GET API -> /api/auth/get-me
 * @dec Get the details of current logged in user
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authControllers.getMeController);

module.exports = authRouter;
