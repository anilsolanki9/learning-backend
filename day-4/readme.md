Backend me folder structure bhot important hai.

# src

- Is me hmare server ki files rhegi.

## app.js

- server create krna
- server config krna

## server.js

- Server start krna
- Database se connect krna

---

# Script add krna

```json
{
    "dev" :`"npx nodemon server.js"
}
```

```bash
$npm run dev
starts
npx nodemon server.js
```

---

`req.body` is used for biiger data
`req.params` => only used for single values data, from the endpoint

---

## Workflow

- Create server in app.js, and config it, and export server instance from app.js

```js
module.exports = app;
```

- Import it inside server.js

```js
const app = require("./src/app");
```

- And initiate server in server.js file using

```js
app.listen(3000);
```

---

# Reading req.body

- to read req.body data, we must use a middleware `express.json()` before the use of `req.body`

```js
app.use(express.json());
```

# Reading Dynamic Endpoint

- To read dynamic endpoint value, we use `req.params`
- for the endpoint - `/notes/:id`
- we can get id using `req.params.id`

# Adding note

- Done by pushing the new note data in notes array.

# Reading all notes

- return complete array of notes

# Deleting a note

- get id using `req.params.id`
- use slice(index,1) to delete one note
