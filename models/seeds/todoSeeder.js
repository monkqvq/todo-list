const mongoose = require('mongoose');
const Todo = require('../todo');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

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

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` });
  }
  console.log('done');
});
