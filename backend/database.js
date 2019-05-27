const mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();

const DB = process.env.DB;

mongoose.connect(DB, { useNewUrlParser: true });

mongoose.connection.once('open', () =>
  console.log('Connected to a MongoDB instance')
);
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;
