# Auth System

- Auhtentication -> Konsa user h?
- Authorization -> User ki permissions kya h?
- Validation -> User ke data ka format shi h?
- Varification -> User ka data sch me usi ka h?

---

Eg. Social Media Application

- POST `/api/post/postId/like` => Likes a post of `postId`
- POST `/api/post/postId/save` => Saves a post of `postId`

- Many users can like or save posts
- How to differentiate between users that which user is liking the post, We use Authentication.

Auth System

1. Register

```bash
User (userdata = {name, email, password}) ===> Register ===> Server

Server ==> Save userdata to DB, create token with userDocument _id, set token to cookie storage
```

After registration, Each request from client to server, will be having the token saved in cookies.

- We use crypto to hash password, use 'sha256'
- Token me woh data pas krte h jo, 1. User ka data h, 2. Hr ek user ka apna unique ho. Which is obviously `_id`
- Token expiration, third argument in jwt sign, {expiration: "1h"}
- Set the token in cookie storage, use cookie-parser package for this. Read -> req.cookies , Write -> res.cookie("name", value);

- create /get-me api => To get user details who is requesting.
- Token nikalo, req.cookies.token
- const decoded = `jwt.verify(token, process.env.JWT_SECRET);`
- Agr token shi hoga to, usme user ka data aa jaega. eg. id aa jaegi.
- Find user by Id,, put the id, and send user details in response.

- login API
- email, password req.body me ayega
- User exist krta h ya nahi is email ka ? findOne
- user milega to password match kro, user ke password ko compare kro converted hashed input password se.
- agr password shi hua to, token banao, and cookie me set kr do, and res. me user data send kr do.

