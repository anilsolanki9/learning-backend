const userModel = require("../models/user.model");
// const crypto = require("crypto"); // a very low level pckage, we use bcryptjs insteed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    // check if user already exists with given email / username or not
    // $or operator is used to check for multiple conditions
    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    // if the user already exists then we will send a response back to the client with a message that the user already exists
    if (isUserExist) {
        return res.status(409).json({
            message: `User already exist ${isUserExist.email === email ? "with this email." : "with this username."}`,
        });
    }

    // encrypt the password using sha256 algorithm and store the hash in the database
    // const hash = crypto.createHash("sha256").update(password).digest("hex"); // use bcrypt insteed

    const hash = await bcrypt.hash(password, 10); // here 10 is salt number, number of hash layering

    // if the user does not exist then we will create a new user in the database
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage,
    });

    // after creating the user we will generate a JWT token for the user and send it back to the client in the response
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );

    // set the token in the cookie
    res.cookie("token", token);

    // send the response back to the client with the user data
    res.status(201).json({
        message: "User registered successfully.",
        user: {
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        },
    });
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    // check if user existr or not, with the given email or username.
    // if exist then it will get saved in user variable, otherwise it will be null
    const user = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (!user) {
        return res.status(404).json({
            message: `User not found with this ${email ? "email." : "username."}`,
        });
    }

    // is user exist then we will compare the password with the hash stored in the database
    // const hash = crypto.createHash("sha256").update(password).digest("hex"); // use bcrypt instead
    // const isPasswordValid = hash === user.password;

    // password ko hash me convert krke data hai, and database me saved hash se compare krta hai
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password.",
        });
    }

    // If the password is valid
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );

    // set the token in the cookie
    res.cookie("token", token);

    // send the response back to the client with the user data
    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

module.exports = {
    registerController,
    loginController,
};
