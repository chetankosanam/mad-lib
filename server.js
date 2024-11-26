const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// POST route for handling Mad Lib form submission
server.post('/ITC505/lab-7', (req, res) => {
    const { noun, verb, adjective, pluralNoun, place } = req.body;

    if (!noun || !verb || !adjective || !pluralNoun || !place) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields!</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `
        Once upon a time, a ${adjective} ${noun} decided to ${verb} with some ${pluralNoun} 
        at ${place}. They had an amazing adventure filled with fun and surprises!
    `;

    res.send(`
        <h1>Submission Successful</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
});

// Configure server to listen on the correct port
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
