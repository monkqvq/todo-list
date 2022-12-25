const express = require('express');
const home = require('./modules/home');
const todos = require('./modules/todos');

const router = express.Router();

router.use('/', home);
router.use('/todos', todos);

module.exports = router;
