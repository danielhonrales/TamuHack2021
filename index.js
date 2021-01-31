const express = require('express');
const path = require('path');
const datastore = require('nedb');
const data = require('./data');
const logger = require('./logger')
const bodyParser = require('body-parser');

const app = express();

// Init middleware
//app.use(logger);

const database = new datastore('database.db');
database.loadDatabase();
database.insert({ name: "Cake", ingredients: "wheat", rating: "3"})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/formdata', (req, res) => {
    database.insert({name: req.body.name, ingredients: "garbage", rating: "0"})
    res.json(req.body);
});

app.get('/formdata', (req, res) => {
    console.log("test2");
    database.find({}, (err, data) => {
        if(err){
            res.end();
            console.log("failed");
            return;
        }
        res.json(data);
    });
});


// Set static folder (like default files)
app.use(express.static(path.join(__dirname)));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));