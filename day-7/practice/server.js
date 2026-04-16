// start server
// connect to db

require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const dns = require("dns");

const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
