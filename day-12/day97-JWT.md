- JsonWebToken
- BcryptJS
- CookieParser

# 4 Pilers of Auth System

- Authentication (User kon h)
- Authorization(user ki permissions)
- Validation (Data ka format shi h ya nahi)
- Varification (Data shi h ya nahi)

---

# Flow of User Login

- User request to register, with his data (eg. name, email, password)
- Server saves this data to the server, and created an Token
- Token is created by our server or not, we make sure this by jsonwebtoken, server signs the token with a JWT_SECRET.
- Server sends the Token back to user. (Token is created by Server, and is stored in cookie storage of Client side.)
- Once the user have registerd, and he got the token, Then every new request the user made to the server, the token is sent to the server with the request.

---

# Project

- npm init -y
- npm i mongoose express dotenv

```bash
src/
  - app.js
  - config/
          - database.js
  - models/
          - user.model.js
  - routes
          - auth.routes.js

server.js
.env
package.json
package-lock.json
```

- app.js => Create server, and export server
- server.js => initiate server
- .env => Secret Environment Variables, MONGO_URI
- database.js => Database connection Logic, connectToDB()
- models/ => Schema, Models files
- user.model.js
- routes => Related APIs files isme defined krte h, like auth apis, user apis, etc.
- auth.routes.js => Sare authentication APIs is file me create hoti h, eg. register, login. And ye APIs app.js me use hoti h.

```js
userSchema = {
  Name: String,
  email: String,
  password: String,
};

userModel = await mongoose.model("users", userSchema);
```

- package.json => script

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx nodemon server.js"
  }
```

- for env setup, server.js mein `require("dotenv").config()` at first line. Access by `process.env.MONGO_URI`

---

## API calling

- API calling logic in app.js -> Very bad, not maintainable,
- We creatr different api's in different files.
- eg. register api is related to authentication,

- authRouter => app.js file ke alava kisi or file me API create krne ke liye Router use krna pdta h.
- In app.js we have created server app, so we have to use app.get(), app.post() etc for APIs,
- But now as we dont want to clutter.

auth.routes.js

```js
const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
});

module.exports = authRouter;
```

- First we checks if the email already exists or not, if user exists then return
- Create user, save data to database using userModel.
- res 201, user.
- In app.js `app.use("/api/auth", authRouter);`

- Ye jo callback function hai, isko `controller` bhi kahte hai.

```js
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
});
```

- Schema level validation
- Schema me change krne ke ad, server yaad se restart kr lena.

```js
userSchema = {
  Name: String,
  email: {
    type: String,
    unique: [true, "This email address is been used for an account"],
  },
  password: String,
};
```

- Jab email unique nahi hoga toh, error ayega, - Internal Server Error 500. But we never give such errors, thus we check the user exists or not, before even trying to save the data into database (and mongoose give error)
- `const isUserAlreadyExists = await userModel.findOne({email})`
- `if(isUserAlreadyExists) return res.status(409).json()`

# jsonWebToken

- npm i jsonwebtoken
- require jwt in auth.routes.js
- get JWT_SECRET from `https://jwtsecrets.com/`, save it in `.env`
- JWT decode, 
