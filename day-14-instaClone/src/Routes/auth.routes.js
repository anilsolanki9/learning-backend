const express = require("express");
const authControllers = require("../controllers/auth.controller");

const authRouter = express.Router();

// route for user registration, /api/auth/register
authRouter.post("/register", authControllers.registerController);

// route for user login, /api/auth/login
authRouter.post("/login", authControllers.loginController);

module.exports = authRouter;
