const mongoose = require("mongoose");

/**
 * Unique=> true,  add krne ke bad server band krke fir se start krna hi pdega.
 * Aisa krne se h mongodb me validation (indexes) me add ho jaega.
 * This shows internal server error(mongoose error), and we never give such errors.
 * Thus we config our API response and check if user already exists or not.
 */

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "With this email user account already exists"],
  },
  password: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
