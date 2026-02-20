https://www.github.com/ankurdotio/difference-backend-video

---

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
