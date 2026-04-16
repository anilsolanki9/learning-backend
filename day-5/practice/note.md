- 201 -> Successfull POST request
- API ka response hmesha `JSON` format me jayega, with a status code.

```js
res.status(200).json({
  message: "Fetched all notes successfully.",
  notes,
});
```

- With status 204 -> We cant send any response data.

- While server running, write `rs` and enter => it restars the server

---

# A Big problem

- When server restars, all the data is gone
- Why this happens?
- When server starts, the notes array is empty, when user send a request to create a note, then server adds the note to the notes array.
- What is notes array? Its a variable, its value is stored in RAM (Random Access Memory), so whenever server starts, Our server is assigned a random storage location in the RAM to store variables. So on every server start, we get a new random storage location and the old data is lost 😤.
- Database -> Stores data, dont loss data on server restart, because database stores the data in there DATA Centeres
- DB -> SQL(Relational), NoSQL (Non relational) MongoDB

# Setup Database

- Search MongoDB Atlas
- Sign in with Google
- Projects -> View All Projects -> Project0 (Default)
- Create new project -> Name (Cohort 2.0) -> Create Cluster -> Free -> AWS -> Create Deployment
- Credentials (Username, Password)
- In Database we create different types of users (With Different permissions, and features, access to database)
- 1. Read Only
- 2. Read and Modify
- 3. Read and Modify and Delete and everything
- Atlas Admin (DB ka karta dharta, can do anything)
- Choose Connection Method -> Compass -> Copy Connection String
-

## Setings of MongoDB

- Security -> Database and Network Access -> IP Access List -> 0.0.0.0/0 (Allow All)

# Setup MongoDB Compass

- Why Compass => To view the data stored in our Clusters

- Download MongoDB Compass GUI
- Windows ke liye msi file download kre.
- `+` (Add New) => Paste Connection string => Rename => Save and Connect
