https://www.github.com/ankurdotio/difference-backend-video

---

# Instagram Project features

## Authentication

- Register
- Login
- Logout (Token blacklisting)
- OTP based registration.

## Posts features

- Create an post
- See the feed.
- Like posts (Collection types)
- Save posts

## User features

- Followers
- Following

---

# Project Start

- Create a basic server, connect to DB.

---

# User Features

- Values that userModel will have

```js
const userSchema = {
  username: {
    type:String,
    unique:[true, :"Username already exists"],
    required:[true, "User name is required"]
  },
  email: {
    type:String,
    unique:[true, :"Email already exists"],
    required:[true, "Email is required"]
  },
  password: {
    type:String,
    required:[true, 'Password is required']
  },
  bio: String,
  profile_image: {
    type:String,
    default:"https://ik.imagekit.io/qjg20t8q6/default-avatar-icon-of-social-media-user-vector.jpg?updatedAt=1770788524080"
  },
};
```

## APIs

- register -> User ka data save krna, Token user ko dena
- routes/auth.routes.js
- Data => email, username, password, bio, profileImage
- Check if user already exists by email or not !! -> if yes then return 409. finfOne({email})
- Cherck if user exists by username or not !! -> if yes then return 409. findOne({username})
- The above two steps, we have done 2 requests for the same task (Checking user existance), Its not a good practice at all.
- We will perform this 2 in one step.

```js
userModel.findOne({
  $or: [{ username }, { email }],
});
```

- $or: ye operator array acept krta h, jisme hum multiple conditions de skte h. Dono (username, email) me se koi ek se bhi user exists krta h toh woh return kr do.
- If user exists return res 409
- How to know, by which user is already existing , isUserAlreadyExists me user ka data ayega, toh
- isUserAlreadyExists.email === email => Then email same thi, otherwise username
- Then Use crypto to hash password, Create user in DB, create token, Set token to cookie storage. {expiresIn "1d"},
- Then in reponse send 201, and user data (Without password, only username, email, bio, profileImage)

- Use this authRoutes in app.js `/api/auth`

- Later topics
  ===Filehandlling ke liye `multer` use krte h.===
  ===express.validator===
  ===node-mailor===
  ===oAuth===

- Login api /login
- Data -> email, username, password
- Ek time pe user login kr skta h, 1. `email, password` se 2. `username, password` se.

```js
userModel.findOne({
  $or: [
    {
      // Condition1
      username: username,
    },
    {
      // Condition2
      email: email,
    },
  ],
});
```

- Why `username:username` and not `username` ?
- Because when user will give email, password, then username is `undefined`
- And when user give username, password, then `email` is `undefined`
- So finding `undefined` property in database --> May lead to error, thus only undefined value pass hogi, and undefined value h toh, obviously kisi bhi user ka email ya username `undefined` nahi hoga. so undefined vali condition false hi hogi.
- If user nhi milega toh, 404. Usernot found
- If user h then, check password,
- Then create token, and set token to cookie, res. 200

---

# Middleware

# To remove repetitive code, we use middleware.

- If we are using same code block in multiple APIs then we are doind repetitive coding, which is not good.
- So we use Middleware, middleware is a functionality that is executed between

---

- No middleware flow of request
- Client -> App server -> authRouter, postRouter
- postRouter -> POST /api/posts/ , GET /api/posts/ , GET /api/posts/details/:postid
- POST /api/posts/ -> createPostController
- GET /api/posts/ -> getPostController
- GET /api/posts/details/:postid -> getPostDetailsController

- Create a folder and file middlewares/auth.middleware.js
- create a function in it, middleware function.`async function identifyUser(req, res, next) {}`

---

- Now the flow of request.
- All same, at
- POST /api/posts/ ==> `identifyUser` ==> createPostController
- GET /api/posts/ ==> `identifyUser` ==> getPostController
- GET /api/posts/details/:postid ==> `identifyUser` ==> getPostDetailsController

- SO middleware is executed when an API will get called, its executed before any code.

- Request jaegi middleware pe,
- middleware bataega ki request kis user ne ki hai.
- then request ko aage forward kr dega, controllers ke pass.

- Jab request middleware pe jaegi toh, woh ek new property add kr dega. req.user, jisme user ki details hongi.
- request ko aage forward krne ke liye, `next()` . Ka use krte hai.

---

# Following and follower feature

- One approach -> User ke document me, following and follower two arrays bna ke usme un sabki id's add kr de?
- In this approach if there are many users, then we can't store all of them in a single document. Because a document have a limit, a document can only be 16mb. One id takes 12 bytes.
- Suppose there are 5 million (5000000) followers.
- Each need 12 bytes so total bytes needed => 5000000 X 12 => 60 mb
- 16 mb storage is only available
- Required storage will be higher then avialbale storage, so we can't use this approach.

---

- Second approach -> `edge collections`
- Mongo DB have multiple types of collections.
- Let we have a user collection , which have user-A, user-B, user-C
- Lets create a new collection `follows` (It's also known as edge collection).
- If user-B is following user-A. Then weil it store it inside follows collection, as a document.

```js
{
  _id;
  follower: user - B;
  followee: user - A;
  createdAt: Date;
}
```

- By reading this document, we can tell that user-B is a user who is following user-A

- let's store one more, user-C is following user-D

```js
{
  _id;
  follower: user - C;
  followee: user - D;
  createdAt: Date;
}
```

- user-d following user-B

```js
{
  _id;
  follower: user - D;
  followee: user - B;
  createdAt: Date;
}
```

- edge collection -> tells the relation between two documents

---

- Validation layers => 4 layers
- Frontend
- Express validator (First backend validation layer)
- Controller level
- Schema level (Database level)

---

- likes ( edge collection)

```js
{
  _id;
  post: post - id;
  user: username;
  createdAt: date;
}
```

---

# Task

- followModel
- add a property in it, add a status property,

```js
{
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted, or rejected"
            }
    }
}
```

- Following status hai.
- enum => status ki value sirf three ho skti hai, pending, accepted, rejected
- Implement a feature for status, pending, accepted, or rejected.
- Follow request will be in these stages.
- A feature that, can see all the requests, can accept or reject the user.
- accept then accepted for request, rejected then not friend.
