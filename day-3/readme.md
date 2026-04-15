# Day 3

Start server by -> `npm init -y`
Create file -> `server.js`
Install express package -> `npm i express`

---

On server creation its not by default starts , so to the server we must use app.listen(3000)

```js
const express = require("express");

const app = express(); // express Server instance created and saved into app, not started yet

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
}); // server starts
```

---

- Run the server

```bash
node server.js
```

- When we do modifications, server still runs on old code, so to restart server automatically on changes

```bash
npx nodemon server.js
```

---

By default express server can't read `req.body` data, because its a stream. So to give our server power to read `req.body`, we use a middleware

```js
app.use(express.json());
```

Always use middleware on server, after its creation and before initialization.

---

When the callback executes?

```js
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
```

The callback is executed when server is running and ready to listen to user requests.

---

# API

API => Application Programming Interface.

- Communication between two devices on internet is done using APIs.
- An api is a set of rules and protocols that enables different software programs to communicate and exchange data with each other.

It acts as a middleman, which allow one application to request service/data from another.

```bash
Client Side <---data---> API <---data---> Server Side

Instagram App <---data---> API <---data---> Instagram Server
```

- API can be of different types.

---

## REST

REST => Representational State Transfer.

- Its architectural style of designing networked applications.
- It relies on stateless, client-server communication over HTTP/HTTPS using standard methods and status codes.
- RESTfull APIs are designed around resources.
- Resource can be anything (users, products, documents etc.) that can be accessed via RESTful API. each resource has an Unique Identifier(URI).
- Resources are stored in JSON format.
- Stateless communication => Each request from client to server contains all needed information. Server donot store any state about client sessions.
- HTTP Status Codes => Server use HTTP Status codes to indicate the outcomes of a client's request.

---

REST API -> Pdf
https://drive.google.com/file/d/12zFQ5O_YVCvIqPSsGfJElvhBOvbhYr1R/view?usp=sharing

---

# REST API

## Main two rules of REST APIs

- Protocols used in these API is http/https.
- Communication kis type ka hai uske hisab se decide hota hai ki Method kya hoga. (GET, POST, PUT, PATCH, DELETE) , ANY?, HEAD?, OPTION?
- **GET** => Server se Data mangane ke liye
- **POST** => Server pe kuch create krne ke liye (eg. user account, user post, user comment). Data is sent with `req.body` .
- **PUT** => Resource data already on server and we want to update whole resource data.
- **PATCH** => Resource ka ek chota sa part update krna hai.
- **DELETE** => Resource ko delete krna hai.

Idepotent => same input ka same output.

- Post => not idempotent, because on all request a different task will be performed.
- Rest all methods are idempotent.

Safe method => Don't modify the server data. (GET, HEAD, OPTIONS are safe methods.)

## HTTP Status Codes

- 1xx (Informational) =>Request was recieved and in process.
- 2xx (Success) => request was successfully processed and understood, and completed.
- 3xx (Redirectional) => Further actions needs to be taken by user to fulfill the request.
- 4xx (Client Error) => The client send a request with invalid syntax data or a request that can not be fulfilled.
- 5xx (Server Error) => The server failed to fulfill appearently valid request. This error typically indicates problems with server or backend services.

### Success

- 200 => OK => A successfull `GET` Request
- 201 => Created => A Successfull `POST` request.
- 204 => No Content => `DELETE` request is fulfilled.

### Redirectional

- 301 => Moved Permenantly => Redirect old URL to a new one
- 302 => Found => Temporary redirect to a different URL
- 304 => Not Modified => When resource is already present on client side, and is requested again, then woh change nahi hota and we send this code.

### Client Error

- 400 => Bad Request => Invalid request body, or missing parameters in a request.
- 401 => Unauthorized => When user tries to access a resource that requires authentication, and `user is not authorized`.
- 403 => Forbidden => User is authorized but don't have required permission to access the resource.
- 404 => Not Found => Invalid URL or Resource Doesnot exists.
- 405 => Method Not Allowed => The HTTP Method is not supported for the resource you are applying on.
- 409 => Conflict => Error coming by clash of the state of resource present on server.
- 422 => Unprocessable Entity => Jo data request me bheja hai woh validation rules pass nahi kar paa rha hai.

### Server Error

- 500 => Internal Server Error => A generic server side error
- 501 => Not Implemented => When server do not support the requested operation.
- 503 => Service Unavailable => Server is overloaded or down for maintainance.

## Best Practices for RESTful APIs

- use nouns for resource name -> /users , /products
- Use plural names for collections -> /users
- Use proper HTTP Status Codes to convey the outcome of request.
- Design stateless API that donot rely on session storage on the server.

---

# Notes App Task

- User can create a note
- Can see all the notes
- Update a note
- Delete a note

API Client
App -> Postman
(Alternative) VS Code Extension -> `Thunder Client`

```js
app.post("/notes", (req, res) => {
  notes.push(req.body); // req.body me aane vale data ko notes array me push kr diya.
  res.send("Note created sucesfully");
});
```

- req me client se aane vala sara data `req` me aata hai.
- server ko koi response bhejna hai toh `res` ka use krna padega.

## Middleware : express.json()

- By default req.body ka data express nahi padh pata.
- Usko enable krne ke liye ki woh req.body me aane vala data padh paye, uske liye we use middleware `express.json()`
- `app.use()` means we are using a middleware. `express.json()` is a middleware.

```js
app.use(express.json());
```

postman se server request ke sath data bhejne ke liye

- body -> raw -> JSON format

```json
{
  "title": "Test title",
  "description": "test description"
}
```

This data to server is sent to the server in `req.body`

---

```js
const notes = [
  {
    title: "test title 1",
    description: "test description 1",
  },
  {
    title: "test title 2",
    description: "test description 2",
  },
];
```

# Postman

- New workspace
- new request, choose method, put endpoint url. send.
- Data sending from Postman to server -> Body -> Raw -> JSON

- Frontend to backend data communication `JSON` format me hota hai.
- `req` => frontend se sara data isi me aata hai,
- `res` => backend (server) se data frontend ki taraf isi se jata h.

- Two api can have same endpoint but, they must have diff methods, 