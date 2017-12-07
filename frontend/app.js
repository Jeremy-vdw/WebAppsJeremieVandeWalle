var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

require('./models/User');
require('./models/Summary');
require('./models/Comment');
require('./models/Course');
require('./models/AcademicYear');
require('./models/Rating');

require('./config/passport');

mongoose.connect(process.env.SUMMARY_DATABASE, {useMongoClient: true });

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api/users', users);

<<<<<<< HEAD
=======

>>>>>>> 814f354afd5d88dd29eab69c3ea6813b1a402231
app.use(express.static(path.join(__dirname, 'dist')));
app.all('*', (req, res) => {
  const indexFile = `${path.join(__dirname, 'dist')}/index.html`
  res.status(200).sendFile(indexFile);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
<<<<<<< HEAD

=======
>>>>>>> 814f354afd5d88dd29eab69c3ea6813b1a402231
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



<<<<<<< HEAD
=======


>>>>>>> 814f354afd5d88dd29eab69c3ea6813b1a402231
module.exports = app;
