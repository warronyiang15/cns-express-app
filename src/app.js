const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const todosRouter = require('./routes/todos');
const cnsRouter = require('./routes/cns');
const cnsBasicRouter = require('./router/cns-basic');
const cnsJWTRouter = require('./router/cns-jwt');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/todos', todosRouter);
app.use('/cns', cnsRouter);
app.use('/cns-basic', cnsBasicRouter)
app.use('/cns-js', cnsJWTRouter)

module.exports = app;
