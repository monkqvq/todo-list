// required packages and files
const express = require('express');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// set variables
const app = express();
const port = 3000;

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');
});

// routes
app.get('/', (req, res) => {
  res.send('hello world');
});

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`);
});
