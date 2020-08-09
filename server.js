const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './/public/index.html'))
})

















app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});