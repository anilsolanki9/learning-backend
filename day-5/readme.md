- Mongo db Atlas Download kro.
- Sign UP
- Projects -> View all project -> Create project
- AWS, Create deployment
- Credentials, Username , Password
- These credentials are used to connect to Cluster in th MongoDB Compass.
- These Users can be of many types (Atlas Admin, read/write, read only)
- Conect -> Compass -> Copy Conection String
- MONGO DB CompassInstall Kar lo.
- Security -> Database & Network Access -> IP Access List -> Allow from anywhere !!

# MongoDB

- MongoDB is a NoSQL database.
- Its document based.
- Data is stored in JSON-like documents (BSON Format).

Document Example

```json
{
  "title": "Learn MongoDB",
  "description": "MongoDB basics",
  "createdAt": "2026-02-05"
}
```

Conection String Example

```jsx
mongodb+srv://username:password@cluster0.mongodb.net/
```

---

# Mongoose

- Mongoose is an ODM(Object Based Modelling) Library.
- It is used to Define Schema, Create Models, Interact with MongoD easily.

Install It

```bash
npm i mongoose
```

Connecting MongoDB with Mongoose

```js
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
```

MONGO_URI => connection-string/db-name
eg.

```
mongodb+srv://username:password@cluster0.mongodb.net/myDB
```

## Schema

Schema => It defines Structure, Data types, rules for documents.

Example

```js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true },
);
```

### Common Schema Types

- String
- Number
- Boolean
- Date
- Array
- ObjectID

## Model

Model

- Wrapper arounf each Schema, Used to perform `CRUD` Operations.
- Creates an documents dollection for the Schema, and save all documents created with the schema in that collection.
- If collection is not present then it creates the collection.

```js
const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
```

Collection name => "notes"

We use this noteModel in the APIs where we perform CRUD.

MONGODB => Cluster => Database => Collections => Documents

## CRUD

- C => Create Data

```js
const note = await noteModel.create({
  title: "I am title",
  description: "I am description",
});
```

We can do this using `save()` also

```js
const note = new noteModel({
  title: "I am title",
  description: "I am description",
});

await note.save();
```

---

- R => Read data (Fetch krna)

```js
// Get all notes, .find() returns an array of all objects
const notes = await noteModel.find();

// Get one document based on condition,
const note = await noteModel.findOne({ title: "I am title" });

// Get one document by _id
const note = await noteModel.findById("st72gww627......");

// .find() with condition
const notes = await noteModel.find({ title: "I am title" });
```

---

- U => Update Data

```js
const updatedNote = await noteModel.findByIdAndUpdate(
  noteId,
  { title: "New updates title" },
  { new: true },
);
```

IMP Operatoions

- new: true => Returns updates data
- runValidators: true => Validates Schema Rules

---

- D => Delete data

```js
await noteModel.findByIdAndDelete(noteId);

//OR

await noteModel.deleteOne({ _id: noteId });

// OR to delete many together

await noteModel.deleteMany({ title: "test" });
```
