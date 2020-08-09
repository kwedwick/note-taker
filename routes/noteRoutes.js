const fs = require('fs');
const path = require('path');
const { notes } = require('../db/db.json')
//const { notStrictEqual } = require('assert');

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    if (note.id === notes.id) {
        return false;
    }
    return true
};

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray })
    )
    return note;
};

function deleteNote(body, notesArray) {
    const targetNote = body[0];
    console.log(notesArray)
    console.log(targetNote)

    notesArray = notesArray.filter(note => {
        console.log(targetNote.id + "vs" + note.id)
        return targetNote.id !== note.id
    })

    console.log(notesArray)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray })
    )
};


// function editNote(body, notesArray) {
//     const targetNote = body

// }

module.exports = {
    validateNote,
    createNewNote,
    deleteNote
}