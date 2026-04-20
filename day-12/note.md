# Authentication System

4 pillers of Authentication System

- Authentication => Identification of User to know which user is requesting
- Authorization => Kis user ke pas kya kya permissions hai.
- Validation => Data ka format valid hai ya nahi.
- Verification => Data Correct hai ya nahi.

---

## Authentication

- `Identifying` / `Finding out` which user sent the request.
- Server to user --> Who are you, what's your identity?

## Authorizaation

- Checking What what permissions do the user have.
- User kya kya kar skta hai.
- What a user is allowed to do, checks permissions.

## Validation

- Request me bheje gye data ka format check krna, woh shi hai ya nahi.
- Email, Phone number etc. data ka format check krte hai.
- Is data format correct?

## Verification

- Request me bheja gaya data sahi hai ya nahi, means woh us user ka hai ya nahi ye check krna.
- Provided data is real/correct?

---

## Real world analogy

In school, when a student takes addmission, he gets an ID card. If students want to access any school facility (Library etc), then he have to show the ID card, then he can use it.

Similarly,
When a user register on server, the server creates a token for the user, this token is created by using the user data (`_id`, email etc.).

- User ---`register`---> user Data `{name, email, password}` ---goes to---> Server
- Server do two works,
  - Save data to DB
  - Create a token using user data(id). (This token is Used as IdCard for user)
- This token is then sent to User client side cookie storage in response.

- Once the user get registered, and he gets the token, then
- every request the user sends to server. Then the token will be sent with every request.
- Token sent to server, is decrypted, Then checked if this user exists in database or not.

## Token checking

- Now, as a student from other school also have ID card, then how to diffrentiate them?

- Similarly, if the user have token, then how to identify that the token is created by our server or not???

- We use a `JWT_SECRET` key, and the server signs every token with this JWT secret key. This `Jwt secret key` is kept in `.env` and is not disclosed.

### JWT_SECRET

- unique string of characters & numbers.
- Used to verify the token, if it is created by our server or not.
- we get thus from => `https://jwtsecrets.com/`
- eg. Secret key (64 characters) => `c33ea937dbc74d292699c9f03e9b4b944d5d0ce7d4deab1ff3ffb97e7cf13fc2`

---

## Validation using mongoose

In Schema,

```js
const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[/^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});
```

Validation in express => In API call check for empty coming values, and return res early.

---

- User registers (with user data)
- Ssrver saves data to DB, creates a `token`, sign it with `JWT_SECRET`,
- And give it back to user,
- This token contains user data.
- After registeration, after the user gets the token, every new request user creates to our server, token will be send with the request.
- Token helps us to Authenticate user.

---

- JWT Token se related actions ke liye package => `jsonwebtoken`

- cookie ke liye `cookie-parser`

- JWT secret ke liye -> `jwtsecret.com`
- JWT decode krne ke liye -> `JWT Decode`

- Token cookie storage me save hota hai.
- Cookie storage ka access server ke pass hota hai.
