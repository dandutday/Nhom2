var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session'
  , secret: "damducduy"
  , httpOnly: true
  , maxAge: 30 * 60 * 1000
  , secure: false
  , overwrite: false
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quanly', express.static('public/admin/'));
app.use('/quanly', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://damducduy:2810@cluster0-9flcr.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


module.exports = app;
