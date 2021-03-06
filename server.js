// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/data', (req, res) => {
    console.log(req.body);
    const d = Date.now();
    projectData = req.body;
    res.sendStatus(200);
});

app.delete('/data', (req, res) => {
    projectData = {};
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server started'));