# What is server

- A machine, that is programmed to give responses to user requests.

## Initiate node application

```bash
npm init -y
npm i express
```

- Create a file server.js

```js
const express = require("express");

const app = express(); // server instance created, server not started

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", function(req, res)=>{
  res.send("This is about page");
});

app.listen(3000, () => {
  console.log("Server running on port:3000");
});
```

- app.get("/") => Jab user / pe request krega to res.send("Hello World"), Hello World send hoga respose me.

- Run the script using

```bash
node server.js
```

- Go to `http://localhost:3000`
- After each modification in server code, we have to restart the server with `node server.js`
- This command by default don't restart on modifications.
- Thus we use `npx nodemon server.js` , By this server automatically start restarting on modification.

```bash
npx nodemon server.js
```

- 3000 => PORT Number.
- A port number is given by OS , to identify this task, and communicate through it.
- 3000 is a general PORT number used for server, More examples. 8080, 8000, 4000, 7000, 5173

---

## npm vs npx

- npm => node package modules
- npx => node package executioner

---

# Deploying a server

- Make the code available to your github

