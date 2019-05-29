const mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.once('open', () =>
  console.log('Connected to a MongoDB instance')
);
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;
