const mongoose = require('mongoose');

function connectToDb() {
  const dbURI = process.env.DB_CONNECT;
  if (!dbURI) {
    console.error('DB_CONNECT environment variable not set!');
    return;
  }

  mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));
}

module.exports = connectToDb;
