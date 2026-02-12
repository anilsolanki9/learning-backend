require("dotenv").config(); // load environment variables from .env file
const app = require("./src/app"); // import the app instance from src/app.js
const connectToDb = require("./src/config/database"); // import the function to connect to the database

connectToDb(); // connect to the database

const PORT = process.env.PORT || 3000; // set the port to the value of the PORT environment variable or default to 3000

// start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
