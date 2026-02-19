require("dotenv").config(); // to enable env access
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB(); // Database se conect krega

// server started
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
