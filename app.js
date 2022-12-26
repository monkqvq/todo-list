// required packages and files
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./routes');
require('./config/mongoose');

// set variables
const app = express();
const port = 3000;

// app setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(routes);

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`);
});
