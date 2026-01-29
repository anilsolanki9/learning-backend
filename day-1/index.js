// running js code in terminal
// console.log("Hello world");
// shortcut to open terminal - > ctr + `
// open terminal and write $node index.js
// Output => Hello world
// for (let i = 0; i < 100; i++) console.log(i);

//
// Using packages
// install package from https://www.npmjs.com
// npm i <package-name>
// to use package require it, and store in a constant
// const catMe = require("cat-me");
// console.log(catMe()); // random cat get printed each time
// run the script using $node jsfilename

//
// server create krne se pahle ek command chalao
// $npm init -y
// this command means we have initialized a node application
// Create server using express (install express package)
// npm i express
// hr ek package ko access krne ke liye hum use require krte hai, and then ek constant me store kr dete hai
// server create krne ke liye express() use krte hai, // is se server sirf create hota hai, start nahi
// server ko bhi ek constant app me tore kr do
// server start krne ke liye
// app.listen(3000); likh doge toh server chal jaega on the port 3000,
// run the script $node index.js
// browser me http://localhost:3000 pe jaoge to is server ko access kr paoge
// abhi server koi output nahi de rha because we havn't programmed it to give responses

const express = require("express"); // express ki functioanlities use kr skenge express const ka use krke
const app = express(); // server created using express() and stored in app const, server created not started

app.listen(3000); // server started on port 3000
// script run kro $node index.js
// browser me http://localhost:3000 pe jao
