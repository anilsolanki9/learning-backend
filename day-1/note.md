# Start

- Create a Main directory (Backend)
- Create a subfolder (day-1)
- In terminal run `code ./day-1 -r`
- Install `node.js`
- Create a Js file (eg. index.js)

## Running Js outside browser

- Go to the directory of index.js
- Then run `node <filename.extension>`, means

```bash
node index.js
```

## What are packages

- A code which is not written by us, its written by other developers, and made available public, so that other developers can use it in there project.
- Its reusable piece of code, it helps developers to avoid writting everything from sratch.
- eg. `express`, `nodemon`, `mongoose`

## Where are packages available?

- Is jagah pe js ke sare packaes available h, `https://www.npmjs.com/`

## How to use packages

- To use package, we have to bring the package code to our machine, or more specifically in our project.
- eg. package we are using for understanding package -> `https://www.npmjs.com/package/cat-me`

## How to bring the package code to our machine ?

- To brind the package code, we have to install the package
- Run `npm i cat-me`
- This command installs package to our machine ( current directory folder)
- To install package as a dev dependency (Means the package is only available in dev mode, not in build)

```bash
npm i nodemon --save-dev
```

## How to use package in our project ?

- `require()` the package, and save this to a constant.
- `const catMe = require("cat-me");`
- We can use `require()` or `import`
- Read the documentation to understand how it works, how we can use it.
- By the documentation, we know that `catMe()` function on run returns an cat drawing text, that wecan console to view. So
- `console.log(catMe())`

```js
const catMe = require("cat-me");
console.log(catMe()); // random cat get printed each time
```

- Output

```
  /\ ___ /\
 (  o   o  )
  \  >#<  /
  /       \
 /         \       ^
|           |     //
 \         /    //
  ///  ///   --
```

---

## Underatanding files and folders

### package.json

- Stores meta data info of project, like author, version, package name, etc.
- Store list of names of dependencies (packages) which are used in the project.

### node_modules/

- Packages code, which we install actually get stored into `node_modules` folder.

### package-lock.json

- Our dependencies also have sub dependencies, and those sub dependencies may also have further sub dependencies.
- So all the listing of dependency tree is stored in package-lock.json

---

# What is Server

- Server is a machine, that have its own OS, processor, storage and RAM.
- Server is a machine, but its programmed that when a user sends a request to it, then Server can sends a good response to user.
- eg. User search a query, It goes to server, then server response the matching results.
- Server
  - Listen to client requests
  - Process requests
  - Sends back proper responses.
- Server runs on a port number, eg. 3000

## Programming Server

- start by a command `npm init -y` : This command initiates a node js project.
- Install `express` package, `npm i express`
- Express is a package which let us make server very easily.
- create a file app.js

```js
const express = require("express");

const app = express(); // this line creates an express server instance

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

// app.listen(3000) => Starts the server on port 3000, callback function is executed when server starts running on the port
```
