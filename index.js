const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const parseWorker = require('./workers/parser');
const db = require('./db');
const constants = require('./constants');
const PORT = constants.PORT;
const DB_URL = constants.DB_URL;

const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', index);
app.get('/run', function (req, res) {
  const runned = parseWorker.run();
  if (runned) return res.send('runned!');
  res.send('some error occured when running :(');
});
app.get('/stop', function (req, res) {
  const stopped = parseWorker.stop();
  if (stopped) return res.send('stopped!');
  res.send('some error occured when stopping :(');
});

db.connect(DB_URL, function (err) {
  if (err) {
    return console.log('Connection refused :(\nError:', err);
  }

  app.listen(PORT, function () {
    console.log('App start listening on port:', PORT);
  });
});
