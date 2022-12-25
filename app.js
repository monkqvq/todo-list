// required packages and files
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Todo = require('./models/todo');
const routes = require('./routes');

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

app.use(methodOverride('_method'));

app.use(routes);

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`);
});
