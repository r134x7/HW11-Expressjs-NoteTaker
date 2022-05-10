const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid'); // npm package to generate unique ids
const db = require("../db/db.json") // the database filepath
const { readAndAppend, writeToFile, readFromFile } = require('../helpers/fsUtils'); // to read and save to the database


notes.get('/', (req, res) => { // to GET notes
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
    );
    console.info(`${req.method} request received to get notes`); // to check console log in terminal
    console.log(db); // to check json data from the console log in terminal
});

notes.post('/', (req, res) => { // to POST notes
    console.info(`${req.method} request received to add a note`); // to check console log in terminal

    const { title, text } = req.body; // Destructuring assignment for the items in req.body
  
    if (title && text) { // if the values are not undefined
      const newNote = { // creates a new object
        title,
        text,
        id: uuidv4(), 
      };

      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding notes');
    
    }
});

// delete method taken from 11-Express/28-Stu_Mini-Project
notes.delete('/:id', (req, res) => { // to delete notes using unique id in url 
  const notesId = req.params.id; // gets the id from the object
  console.log(notesId);
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      console.log(json);
      const result = json.filter((notes) => notes.id !== notesId);
      console.log(result);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`${notesId} has been deleted`);
    });
});

module.exports = notes;
