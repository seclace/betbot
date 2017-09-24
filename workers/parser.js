const fetch = require('isomorphic-fetch');
const jsonfile = require('jsonfile');
const path = require('path');

const config = require('../config');
const DATA_FILE_PATH = config.DATA_FILE_PATH;
const PARSE_INTERVAL = config.PARSE_INTERVAL;

const url = 'https://1xstavka.ru/LineFeed/Get1x2_Zip?' +
  'sports=4&' +
  'count=1&' +
  'tf=1000000&' +
  'antisports=38&' +
  'mode=1&' +
  'country=1&' +
  'partner=51';

const state = {
  interval: null
};

function parse(inputUrl) {
  if (state.interval) clearInterval(state.interval);
  if (!inputUrl && !url) return false;
  state.interval = setInterval(function () {
    fetch(inputUrl || url)
    .then(function (res) { return res.json() })
    .then(function (json) {
      jsonfile.writeFileSync(DATA_FILE_PATH, json);
      return json;
    }).catch(function () {});
  }, PARSE_INTERVAL);
  return !!state.interval;
}

function stopParse() {
  clearInterval(state.interval);
  state.interval = null;
  return true;
}

exports.run = parse;
exports.stop = stopParse;