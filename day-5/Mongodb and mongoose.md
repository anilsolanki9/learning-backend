# MongoDB + Mongoose Notes

## 1. MongoDB

- **MongoDB** is a **NoSQL**, **document-based** database.
- Data is stored in **JSON-like documents (BSON)**.
- No fixed table structure (schema-less at DB level).

Example document:

```json
{
  "title": "Learn MongoDB",
  "description": "MongoDB basics",
  "createdAt": "2026-02-05"
}
```

---

## 2. MongoDB Atlas

- **MongoDB Atlas** = Cloud-hosted MongoDB service.
- No local DB needed for production.
- Provides:
  - Free cluster
  - Auto backups
  - Security & scaling

Connection string example:

```jsx
mongodb+srv://username:password@cluster0.mongodb.net/myDB

```

---

## 3. Mongoose

- **Mongoose** is an **ODM (Object Data Modeling)** library.
- Used to:
  - Define **Schema**
  - Create **Models**
  - Interact with MongoDB easily

Install:

```bash
npm install mongoose

```

---

## 4. Connecting MongoDB with Mongoose

```jsx
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
```

---

## 5. Schema

### What is Schema?

- Defines **structure**, **data types**, and **rules** for documents.

Example:

```jsx
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
```

### Common Schema Types

- `String`
- `Number`
- `Boolean`
- `Date`
- `Array`
- `ObjectId`

---

## 6. Model

### What is Model?

- Model is a **wrapper around Schema**
- Used to perform **CRUD operations**
- Automatically creates a **collection**

```jsx
constNote = mongoose.model("Note", noteSchema);
module.exports = Note;
```

> `Note` → MongoDB collection becomes `notes`

---

# CRUD OPERATIONS

---

## 7. CREATE (Insert Data)

### Method: `create()`

```jsx
const note = await Note.create({
  title: "MongoDB",
  description: "Learn CRUD",
});
```

### Using `save()`

```jsx
const note = new Note({
  title: "Node.js",
  description: "Backend basics",
});
await note.save();
```

---

## 8. READ (Fetch Data)

### `find()` → Get ALL documents

```jsx
const notes = await Note.find();
```

### `findOne()` → Get FIRST matching document

```jsx
const note = await Note.findOne({ title: "MongoDB" });
```

### `findById()` → Get by `_id`

```jsx
const note = await Note.findById("65c0a9b...");
```

### `find()` with condition

```jsx
const notes = await Note.find({ title: "MongoDB" });
```

---

## 9. UPDATE (Modify Data)

### `findByIdAndUpdate()`

```jsx
const updatedNote = await Note.findByIdAndUpdate(
  noteId,
  { title: "Updated Title" },
  { new: true }, // returns updated document
);
```

### Important Options

- `new: true` → returns updated data
- `runValidators: true` → validates schema rules

---

## 10. DELETE (Remove Data)

### `findByIdAndDelete()`

```jsx
await Note.findByIdAndDelete(noteId);
```

### `deleteOne()`

```jsx
await Note.deleteOne({ _id: noteId });
```

### `deleteMany()`

```jsx
await Note.deleteMany({ title: "Test" });
```

---

## 11. Full CRUD Example

```jsx
// CREATE
app.post("/api/notes", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

// READ
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// UPDATE
app.patch("/api/notes/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

// DELETE
app.delete("/api/notes/:id", async (req, res) => {
  awaitNote.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
```

---

---
