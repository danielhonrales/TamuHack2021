const express = require('express');
const path = require('path');
const data = require('./data');
const logger = require('./logger')

const app = express();

// Init middleware
//app.use(logger);

// Get entire json
app.get('/api/members', (req, res) => {
    res.json(data);
});

// Get single json
app.get('/api/members/:id', (req, res) => {
    res.json(data.filter(recipe => recipe.rating === req.params.id));
});

// Set static folder (like default files)
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));