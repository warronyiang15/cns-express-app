const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const todosRouter = require('./routes/todos');
const cnsRouter = require('./routes/cns');
const cnsBasicRouter = require('./routes/cnsbasic');
const cnsJWTRouter = require('./routes/cnsjwt')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/todos', todosRouter);
app.use('/cns', cnsRouter);
app.use('/cnsbasic', cnsBasicRouter)
app.use('/cnsjwt', cnsJWTRouter)

module.exports = app;
