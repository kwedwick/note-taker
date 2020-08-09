const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
//const { type } = require('os');
const { notes } = require('./db/db.json')
const { validateNote, createNewNote, deleteNote } = require('./routes/noteRoutes');
const nodemon = require('nodemon');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    //console.log(notes)
    res.json(notes);
});
app.get('/api/note/:id', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.post('/api/notes', (req, res) => {
    // determine id
    req.body.id = notes.length+1;
    // check to see if the object is valid 
    if (!validateNote(req.body)) {// if not valid, reject
        res.status(400).send("The note is not properly filled out");
        //console.log(req.body)
    } else {//else post to db 
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// app.post('/api/notes/:id', (req, res) => {

// })

app.delete('/api/notes/:id', (req, res) => {
    const target = notes.filter(note => note.id === parseInt(req.params.id));

    if (target) {
        deleteNote(target, notes);
        //console.log(deleteNote);
        //res.json(notes)
        res.sendFile(path.join(__dirname, './public/notes.html'));
    } else {
        res.status(400).json({ msg: `No note with that id found` });
    }
})














app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});