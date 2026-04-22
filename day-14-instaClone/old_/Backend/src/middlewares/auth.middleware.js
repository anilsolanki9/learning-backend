const jwt = require("jsonwebtoken");
/**
 * This middleware can do these things
 * - req.cookie se token nikal ke verify kr lega.
 * - and then ye bta skta h ki kis user ne request ki hai.
 */
async function identifyUser(req, res, next) {
    const token = req.cookies.token;
    // if token not found means wheather -> user don't exist or user is logout

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access.",
        });
    }

    // If token is wrong then jwt.varify throw an error directly .. so to create our own custom response and not the error, we use try catch

    let decoded = null; // because we have to change it inside try block, and have to use it outside try block

    try {
        // agr token valid hoga to, woh details aa jaegi, jo humne token bnat time di thi. => {id: user._id}
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "User is not authorized, token is wrong",
        });
    }

    /**
     * console.log(decoded); // we get the data we provided while creating token
     * { id: '698f224ab9378bc333d7abb0', iat: 1770988106, exp: 1771074506 }
     */

    req.user = decoded;

    next();
}

module.exports = identifyUser;
