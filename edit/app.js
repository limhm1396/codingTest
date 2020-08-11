var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-overr')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const editRouter = require('./routes/edit');
const fileUploadRouter = require('./routes/upload');
const models = require('./models/index.js');

async function dbConnect () {
  try {
    models.sequelize.sync();
    console.log('DB connect success');
  }
  catch (err) {
    console.log('DB connect fail');
    console.error(err);
  }
}

dbConnect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/edit', editRouter);
app.use('/upload', fileUploadRouter);
app.use('/upload', express.static('uploads'));

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
