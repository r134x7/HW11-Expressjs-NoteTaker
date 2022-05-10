const express = require("express");
const path = require('path'); // to get path directories
const api = require('./routers/index.js');

const app = express();

const PORT = process.env.PORT || 3001; // to connect to local host or server

app.use(express.json()); // middleware to parse json data
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded data
app.use("/api", api) // for api routes

app.use(express.static('public')); // middleware to GET the static files without having to write a GET request

app.get('/', (req, res) => { // get index
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

app.get('/notes', (req, res) => { // get notes
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})
  
app.get('*', (req, res) => { // get index when anything is entered in url after /
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

app.listen(PORT, () => {
    console.log(`Note Taker listening at http://localhost:${PORT}`);
  });
