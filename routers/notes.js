const notes = require('express').Router();
const db = require("../db/db.json") // the database filepath
const { readAndAppend, readFromFile } = require('../helpers/fsUtils'); // to read and save to the database


notes.get('/', (req, res) => { // to GET notes
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
    );
    // res.json(db) // responds to GET request with json data from database filepath
    console.info(`${req.method} request received to get notes`); // to check console log in terminal
    console.log(db); // to check json data from the console log in terminal
  });

notes.post('/', (req, res) => { // to POST notes
    console.info(`${req.method} request received to add a note`); // to check console log in terminal

    console.log(req.body);

    const { title, text } = req.body; // Destructuring assignment for the items in req.body
  
    if (title && text) { // if the values are not undefined
      const newNote = {
        title,
        text,
        // review_id: uuid(), // unique id to be added later
      };

      readAndAppend(newNote, './db/db.json');
      res.json(`note added successfully`);
    } else {
      res.error('Error in adding notes');
    
    }
  });

module.exports = notes;
