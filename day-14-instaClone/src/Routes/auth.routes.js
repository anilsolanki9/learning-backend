const express = require("express");
const controllers = require("../controllers/auth.controller");

const authRouter = express.Router();

// route for user registration, /api/auth/register
authRouter.post("/register", controllers.registerController);

// route for user login, /api/auth/login
authRouter.post("/login", controllers.loginController);

module.exports = authRouter;
