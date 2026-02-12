require("dotenv").config(); // Now we can use env variables using process.env

const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
