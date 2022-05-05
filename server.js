const express = require("express");
const path = require('path'); // to get path directories

const app = express();

const db = require("./db/db.json") // the database filepath

const PORT = process.env.PORT || 3001;

app.use(express.json()); // middleware to parse json data
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded data

app.use(express.static('public')); // middleware to GET the static files without having to write a GET request

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(db) // responds to GET request with json data from database filepath
    console.info(`${req.method} request received to get notes`); // to check console log in terminal
    console.log(db); // to check json data from the console log in terminal
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

app.listen(PORT, () => {
    console.log(`Note Taker listening at http://localhost:${PORT}`);
  });

//app.verb("route", (request, response) => res.send("something") || res.json(db))

// will most likely need express 
// public folder contains static files

// there is an index page
// have to set up a GET route for the notes page

// most likely need to validate { title: "", text: ""} via destructuring when notes are entered.

// require fs for writing db file
// readfile, parse data, push new data to array, write file json stringify

// see if modularization is needed, probably not when there's only two routes

// add wildcard to index route placed after the other routes due to linearity

// need get / post reqs for /api/notes for db.json

// have to get unique id's for post requests.............
// which then relates to...
// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
