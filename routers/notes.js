const notes = require('express').Router();
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
const db = require("../db/db.json") // the database filepath
const { readAndAppend, writeToFile, readFromFile } = require('../helpers/fsUtils'); // to read and save to the database


notes.get('/', (req, res) => { // to GET notes
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
    );
    // res.json(db) // responds to GET request with json data from database filepath
    console.info(`${req.method} request received to get notes`); // to check console log in terminal
    console.log(db); // to check json data from the console log in terminal
});

// GET Route for a specific tip
// notes.get('/:id', (req, res) => {
//     const notesId = req.params.id;
//     readFromFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         const result = json.filter((notes) => notes.id === notesId);
//         return result.length > 0
//           ? res.json(result)
//           : res.json('No notes with that ID');
//       });
//   });

notes.post('/', (req, res) => { // to POST notes
    console.info(`${req.method} request received to add a note`); // to check console log in terminal

    console.log(req.body);

    const { title, text } = req.body; // Destructuring assignment for the items in req.body
  
    if (title && text) { // if the values are not undefined
      const newNote = {
        title,
        text,
        id: uuidv4(), 
      };

      readAndAppend(newNote, './db/db.json');
      res.json(`note added successfully`);
    } else {
      res.error('Error in adding notes');
    
    }
});

notes.delete('/:id', (req, res) => {
  const notesId = req.params.id;
  console.log(notesId);
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
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
