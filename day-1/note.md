# Start

- Create a Main directory (Backend)
- Create a subfolder (day-1)
- In terminal run `code ./day-1 -r`
- Install `node.js`
- Create a Js file (eg. index.js)

## Running Js outside browser

- Go to the directory of index.js
- Then run `node <filename.extension>`, means `node index.js`

## What are packages

- A code which is not written by us, its written by other developers, and made available public, so that other developers can use it in there project.

## Where are packages available?

- Is jagah pe js ke sare packaes available h, `https://www.npmjs.com/`

## How to use packages

- To use package, we have to bring the package code to our machine, or more specifically in our project.
- eg. package we are using for understanding package -> `https://www.npmjs.com/package/cat-me`

## How to bring the package code to our machine ?

- To brind the package code, we have to install the package
- Run `npm i cat-me`
- This command installs package to our machine ( current directory folder)

## How to use package in our project ?

- `require()` the package, and save this to a constant.
- `const catMe = require("cat-me");`
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

- Server is a machine, that have its own OS, processor,
