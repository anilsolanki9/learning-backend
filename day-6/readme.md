# Databases

### Cluster => Combination of two things

- Processor
- Storage

- Cluster contains Databases.
- A Cluster can store more than one Databases

### There are many types of servers.

- Web server
- Database Server
- File Server
- Email Server
- Applocation Server

### We are using Database server (MongoDB Server).

- So mongoDB => Created many Database Servers.
- We will use the nearest Mongo DB server, to store our data.
- There we will store data of our application.
- We will take a small part of storage from the Database of MongoDB, and use its DB server to use it.

```bash
MongoDB Atlas => Project => Cluster => MongoDB Compas => Cluster Databases => Collections => Documents
```

---

# Mongo Db Atlas

- Search Mongo DB atlas
- Login
- Projects => View all Projects => Create new project => Create Cluster
- Add Atlas Admin USer, copy configurations or the connection string
- Database & network Acess
  - We have two security layers for the Cluster
  - 1. Networkk access layer(Konsa IP DB se connect kr skta hai.)
  - 2. USer Acess Layer (Set diff types of users with diff permissions.)
- IP access => 0.0.0.0/0 (Only for Development)
- If we forget the password, users -> generate new password.

- While creating cluster, always choose nearest Database location, so that the latency can be reduced.

### Security Layers of Database

#### Network Access Layer => Konsa IP address Cluster ko access kr skta h.

- production me hme ek static IP mil jaata h. Development me IP change hota rhta h, isliye Allow access form anywhere krenge. (0.0.0.0/0), `Never do this in production`

#### Database User Access layer => Different users with different ppermissions

- Atlas admin
- Read and write
- Read only

## Connection string kya karti hai?

`MongoDB compass` ko hmare `Cluster` se connect krti hai.
Cluster Connection String =>
`mongodb+srv://<username>:<password>@cluster0.prppvo2.mongodb.net/`

Ek Cluster can store many Databases. And a Database can store many collections.
Database connection string (eg. DB Name `day-6`) => MONGO_URI =>
`mongodb+srv://<username>:<password>@cluster0.prppvo2.mongodb.net/day-6`

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

---

# Work Flow

- app.js me server bna ke expport krke, server.js me listen kro.
- mongoose => Helps to connect with MongoDB database. npm i mongoose
- Ek function connectToDB jisme logic likhenge db se connect ka.
- mongoose.connect(Mongo_URI)
- Mongo_URI => connection-string/db-name eg. connection-string/day-6
- mongoose.connect(Mongo_URI) => Agar database present h to us se connect.Nahi h to database create krke connect krti h.
- mongoose.connect() is an async function, .then() .catch() 
- 
