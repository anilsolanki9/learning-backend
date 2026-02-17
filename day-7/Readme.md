
Cluster => Processor + Storage

Database => For storing Data

Connection String => `mongodb+srv://user:password@cluster0.prppvo2.mongodb.net`

MONGO_URI => `mongodb+srv://user:password@cluster0.prppvo2.mongodb.net/day-7`

The Above URI creates an Database(name day-7). and connects our server with that database.

---

## Connect Server with Database

Server ko database se connect krne ke liye -> mongoose

```bash
npm i mongoose
```

`mongoose.connect()`

Connection String => Compass ko Cluster se connect krvati hai.

Ab kyuki cluster ke andr Database hota hai, so. Put a `/db-name` after the Connection URI, and it becomes the database-uri.

```.env
MONGO_URI=ssysyy-connection-string/day-7
```

MONGO_URI ko direct mongoose.connect() me nahi rkhte h. we use `process.env.MONGO_URI`

Install a package `dotenv`

Server.js me first line

```js
require("dotenv").config();
```

---

# config folder

Is folder me hum database se connect krne vala logic likhte hai.

config me file bnaenge uska name -> `database.js` hoga.

---

# Models and Schema

Database me data store krne se pahle hume us data ka Schema(format) batana padega. Har ek Schema ke liye hme us se related ek model bnana padta hai, because we arent going to create one data, we will create multiple of them. So using the model we can perform CRUD operation for that data. 

src/models/notes.model.js

Note => models se related sare operations async hote hai. so we use `async`, `await` .

Data hr ek created document ko ek unique _id deta hai. its unique, and every document have its own unique identifier => `_id`


