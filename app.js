// packages and files
const express = require('express');

// set parameters
const app = express();
const port = 3000;

// routes
app.get('/', (req, res) => {
  res.send('hello world');
});

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`);
});
