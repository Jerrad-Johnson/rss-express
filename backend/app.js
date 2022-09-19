const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const {sessionOptions} = require("./common/sessionOptions");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const xmlRouter = require('./routes/xml');
const loginRouter = require('./routes/login');
const {setHeaders} = require("./common/corsHeaders");
/*const {corsDecorated} = require("./common/decorators");*/
let cc = console.log;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  setHeaders(res)
  next();
});

/*app.use(corsDecorated)*/
app.use(session(sessionOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/xml', xmlRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
