# Databased

Cluster => Combination of two things

- Processor
- Storage

- Cluster contains Databases.
- A Cluster can store more than one Databased

There are many ntypes of servers.

- Web server
- Database Server

- So mongoDB => Created many Database Servers.
- We will use the nearest Mongo DB server, to store our data.
- There we will store data of our application.

---

# Mongo Db Atlas

- Search Mongo DB atlas
- Login
- Projects => Create new project => Create Cluster
- Add Atlas Admin USer, copy configurations or the connection string
- Database & network Acess
  - We have two security layers for the Cluster
  - 1. Networkk access layer(Konsa IP DB se connect kr skta hai.)
  - 2. USer Acess Layer (Set diff types of users with diff permissions.)
- IP access => 0.0.0.0/0 (Only for Development)
- If we forget the password, users -> generate new pasword .

## Connection string kya karti hai?

Cluster ko hmare MongoDB compass se connect krti hai.

Ek Cluster can store many Databases. And a Database can store many collections.

# Mongoose

Database me Operations perform krne ke liye, Humko ek package chahiye, uska nam h `mongoose`

```bash
npm i mongoose
```

Mongoose ko require kro. and connect kro.

```js
const mongoose = require("mongoose");
function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
}
connectToDb(); // Server connects to Database
```

process.env.MONGO_URI ko access krne ke liye
`dotenv` package ka use kro.

server.js me first line

```js
require("dotenv").config();
```
