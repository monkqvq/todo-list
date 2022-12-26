const Todo = require('../todo');
const db = require('../../config/mongoose');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` });
  }
  console.log('done');
});
