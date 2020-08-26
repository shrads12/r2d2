const express = require('express');
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.get('/', (req, res) => res.send('Shraddha says Hi!'));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

console.log('Starting server on 8080...');
app.listen(8082);
