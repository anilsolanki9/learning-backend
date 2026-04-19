# Day 93 FullStack

- Create two folders -> `Frontend`, and `Backend`

---

# Backend

- `npm init -y`
- `npm i express mongoose dotenv`

- server.js (Start server, connect to db)
- .env (Private variables) [use dotenv, dotenv config in server.js, process.env.MONGO_URI]
- A folder -> src/
- src/app.js (Create server, config server)
- src/config/database.js (Database se connect krne vala logic code) [connect to DB function]
- src/models/note.model.js (To create noteSchema and noteModel)

### dotenv (.env)

- This file is not uploaded to github
- install `dotenv` to use env variables -> `npm i dotenv`
- `require("dotenv").config()` in server.js
- Use by `process.env.MONGO_URI`

### `env masker` extension (To hide env key)

### Schema

```js
const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});
```

### Model

```js
const noteModel = mongoose.model("notes", noteModel);
```

### API's (CRUD)

- API's route have a `/api` in starting (eg. /api/notes) to identify them as api endpoint,

- Ceate new note -> POST /api/notes -> noteModel.create({title, description})

- Read all notes -> GET /api/notes -> noteModel.find()

- Update a note -> PATCH /api/notes/:id -> noteModel.findByIdAndUpdate(id, {description})

- Delete a note -> DELETE /api/notes/:id -> noteModel.findByIdAndDelete(id)

- All the methods of model is **async**, thus await is used and api callback use **async**.
- model.find() => Always returns an `Array`, and data comes in `Array of Objects`
- id is the id of mongoDb object, that is a unique id aded by mongoose to our document when it is created into mongoDb. In the mongoDb document this is is stored by `_id` key.
  eg. mongoDb document

```json
{
  "_id": "ObjectId('69e23a81611971e3fb8c525a')",
  "title": "My text title 1",
  "description": "My test description 1",
  "__v": 0
}
```

### Enable reading of `req.body`

```js
app.use(express.json());
```

---

# Frontend

- New terminal
- `npm create vite@latest .`
- React -> JavaScript
- Setup Tailwind
- basic setup,
- notes state variable. Which is an array of objects, (4 dummy notes)
- Make good Notes UI, for each `{title, description}`
- `notes.map()` to create notes to the UI.
- Install `axios` => `npm i axios`
- Import axios, `import axios from 'axios'`
- Make an GET API call to `http://localhost:3000/notes` to get all the notes.

```js
axios.get("http://localhost:3000/notes").then((data) => {
  console.log(data);
});
```

### CORS Error

- On this API call, We will get error => CORS Policy Error
- CORS policy means ek domain se dusre domain pe requests nahi bheji ja skti. It will produce CORS error.
- eg. Hacker website requestr to Real Bank website -> Gives CORS Error
- To resolve this issue, we have to allow our frontend to request to the backend.
- Currently we will just enable CORS which means any domain can request to our server,
- **But in real production, we will make sure that only our frontend website can request the backend server.**
- To enable CORS

### Enable CORS

- Go to backend
- install cors package -> `npm i cors`
- Inside app.js

```js
const cors = require("cors");

const app = express();

app.use(cors());
```

- Here we are using cors package as a middleware, that enable our server to accept CORS request.

- Set the response data to the notes array state variable.

### Make all files in public folder avialble globally

```js
app.use(express.static("./public"));
```

- This middleware make everything inside public folder, available publically.
- All assets inside public/ can be accessed by providing name of asset after the url of website.
- eg. `http://localhost:3000/index.html`

### Making a WildCard

- Wild Card,
- koi bhi unknown path jaha resource na ho, toh index.html file chali jaegi.
- `__dirname` => Ye jis file me use kiya ja rha hai, woh jis folder ke andr hai. Us folder tak ka address. for app.js -> /Backend/src/ tak ka path ayega.
- .. => one level above => Backend/
- Fir yaha se /public/index.html

- First of all we need the path from absolute root and as we will deploye our project to the render, thus absolute path will be changed there, thus we need a solution so that the absolute path is automatically fetched as per the environment. So for this we use a `path` package.

```js
const path = require("path");
```

### Using path in wildcard

- At the last of all API's create this WildCard API endpoint

```js
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});
```

- Wild Card,
- koi bhi unknown path jaha resource na ho, toh index.html file chali jaegi.
- `__dirname` => Ye jis file me use kiya ja rha hai, woh jis folder ke andr hai. Us folder tak ka address. for app.js -> /Backend/src/ tak ka path ayega.
- .. => one level above => Backend/

* when html get loaded it requests for js and css file, but don't get it
* The request for js and css look like these
* `http://localhost:3000/assets/index-C86sZUPU.css`
* `http://localhost:3000/assets/index-BRzChCtq.js`
* but it returns index.html file
* because we havn't programmeed server to response these routes
* Thus we have to use one more middleware app.use(express.static('./public'))
* Ye public folder me present sare data assets ko publically available kr deta hai.
* means ab
* `http://localhost:3000/assets/index-C86sZUPU.css`
* `http://localhost:3000/assets/index-BRzChCtq.js`
* can be accessed
