# Cluster

Cluster => Processor + Storage
Cluster Stores multiple Databases

Create a cluster

- Security
- IP access 0.0.0.0/0
- User => atlas admin => user & passwoed
- Copy connecttion string
- Go to mongoDB compas => Add new connection, paste connection string. => save and connect

# Database

Database => For storing Data (Collections)

Each collection (Folder) stores similar data documents.

Connection string is used to connect `MongoDB Compass` to our `Cluster`.
Connection String => `mongodb+srv://<user>:<password>@cluster0.prppvo2.mongodb.net`

MONGO_URI is used to connect database to our server. Using `mongoose`
MONGO_URI => `mongodb+srv://<user>:<password>@cluster0.prppvo2.mongodb.net/day-7`

The Above URI creates an Database(name day-7). and connects our server with that database.

---

## Connect Server with Database

Server ko database se connect krne ke liye -> mongoose

```bash
npm i mongoose
```

`mongoose.connect()`

- Its a async function, so use .then()

Connection String => Compass ko Cluster se connect krvati hai.

Ab kyuki cluster ke andr Database hota hai, so. Put a `/db-name` after the Connection URI, and it becomes the database-uri.

```.env
MONGO_URI=connection-string/day-7
```

MONGO_URI ko direct mongoose.connect() me nahi rkhte h. we use `process.env.MONGO_URI`

### Install a package `dotenv`

```bash
npm i dotenv
```

- In Server.js add this line first

```js
require("dotenv").config();
```

---

# config folder

Is folder me hum database se connect krne vala logic likhte hai.

config me file bnaenge uska name -> `database.js` hoga.

---

# Models and Schema

- Database me data store krne se pahle hume us data ka Schema(format) batana padega.
- Har ek Schema ke liye hme us se related ek model bnana padta hai, because we aren't going to create one data, we will create multiple of them.
- So using the model we can perform CRUD operation for that data.
- Model ke bina CRUD operations perfrom nahi kr skte h. Model is the actual wrapper of Schema.

src/models/notes.model.js

Note => models se related sare operations async hote hai. so we use `async`, `await` .

Data hr ek created document ko ek unique `_id` deta hai. its unique, and every document have its own unique identifier => `_id`

## Schema

- Schema ki properties btani pdti h, hr property ka type and required ya nahi bhi bta skte h.
- noteSchema

```js
{
  title: String,
  description: String
}
```

## Model

- `mongoose.model("notes", noteSchema)`
- It creates a `notes` collection in database.
- Collection => Same data documents in the database are stored in a collection, its like a folder inside the database.
- Model se related sare actions `async` hote h.

## Data Storing in DB

- By defauly DB (Pricisely speakin `mongoose`) document ko unique `_id` deta hai. and `__v` bhi deta hai.(its version)

---

## How to manage Connection string (Private variables)

- create an `.env` file in root directory
- create a variable there, `MONGODB_URI=huyhbhbdcbbhsbhbhhddhdb`
- Install dotenv - `npm i dotenv`
- Server.js ki first line -> `require("dotenv").config()`
- To use this variable `process.env.MONGO_URI`

- Create an `.gitignore` => in it write ->

```.gitignore
node_modules
.env
```

Deployment ke waqt, .env file alag se add krte hai.

---

- noteModel.find() => return all the documents of the format of noteSchema, returns an array of objects.
- noteModel.create() => creates the new document, returns the created note.

---

- If db connect hone pe DNS issue aaye toh, paste this line in server.js, just below dotenv config

```js
require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
```


