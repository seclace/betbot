const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');
const constants = require('./constants');
const PORT = constants.PORT;
const DB_URL = constants.DB_URL;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('betbot server starts successfully!');
});

db.connect(DB_URL, function (err) {
  if (err) {
    return console.log('Connection refused :( Error:', err);
  }

  app.listen(PORT, function () {
    console.log('App start listening on port:', PORT);
  });
});
