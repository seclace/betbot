const path = require('path');

exports.DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/betbot';
exports.PORT = process.env.PORT || 3000;
exports.DATA_FILE_PATH = path.join(__dirname, process.env.DATA_FILE_NAME || 'data.json');
exports.PARSE_INTERVAL = process.env.PARSE_INTERVAL || 600000;
