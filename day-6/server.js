const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://my-new-user:CPyd1XAsZRhlFqtK@cluster0.prppvo2.mongodb.net/day-6"
    )
    .then(() => {
      console.log("Connected to Database");
    });
}

connectToDb();

app.listen(3000, () => {
  console.log("Server is running at port: 3000");
});

/*
Server is running at port: 3000
Connected to Database
*/
