require("dotenv").config();
require("node:dns/promises").setServers(["8.8.8.8", "8.8.4.4"]);

const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(process.env.PORT, () => {
  console.log("Server is running of port :", process.env.PORT);
});
