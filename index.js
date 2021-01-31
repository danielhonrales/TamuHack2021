const express = require('express');
const path = require('path');
const datastore = require('nedb');
const bodyParser = require('body-parser');
const scrapers = require('./scrapers');

const app = express();

const database = new datastore('database.db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/formdata', (req, res) => {
    scrapers.getData(req.body.ingredient);
    res.send("found recipes");
});

app.get('/conversion', (req, res) => {
    database.loadDatabase();
    database.find({}, (err, data) => {
        if(err){
            res.end();
            console.log("failed");
            return;
        }
        res.send(data)
    });
});

// Set static folder (like default files)
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));