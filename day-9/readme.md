# Day 93 Full Stack

---

Create two folder

- Backend
- Frontend

---

Backend me

- npm init -y
- express, mongoose, dotenv install kar lo.

---

```js
app.use(express.static("./public"));
```

- ye middleware public folder me present sare assets files ko publically available kra deti hai,
- And now after http://localhost:3000/ ke bad jo bhi ayega woh agar public folder ke bad ke path se match hota hai, like /index.html or /assets.sshshshhshhs.css , or /assets.gstssgssshsjs.js etc toh woh file response me bhej dega,
- And agar nahi milegi toh obvsouly index.html file bhej dega because we are using it as wildcard(Koi aisa path jispe koi resource nahi hai, to index.html file jaega)
- This make everything inside public folder, available publically.
- All assets inside public/ can be accessed by provifing name after url of website.

---

env masker extension to hde MONGO_URI

---

# Fontend

$npm create vite@latest .
React js
$npm run dev

---

# Cors error

Frontend se jab backend perqeusst krenge tab, cors error ayega. 

Isko mitigate krne ke liye-> backend me cors package install krke, app.js me cors require krke, is middelware ko use kr lo, app.use(cors()); jis se server CORS requests accept and respond kr paega

---

Frontend se API call krne ke liye -> axios use krte h

axios install kro

Live link of server

https://learning-backend-lvt0.onrender.com/