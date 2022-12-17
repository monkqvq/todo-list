// required packages and files
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Todo = require('./models/todo');

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

// set app
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.log(error));
});

app.get('/todos/new', (req, res) => {
  return res.render('new');
});

app.post('/todos', (req, res) => {
  const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料

  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id;

  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id;

  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`);
});
