const express = require('express');

const app = express(); // server ka instance create hua and stored in app

app.listen(3000, () => {
  console.log('Server started on port 3000');
}); // app.listen() server start krta hai, 3000 is port
// file run kr do
// go to https://localhost:3000
