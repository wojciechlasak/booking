var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var clientRouter = require('./routes/clients');
var roomRouter = require('./routes/rooms');
var opinionRouter = require('./routes/opinions');
var reservationRouter = require('./routes/reservations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/clients', clientRouter);
app.use('/rooms', roomRouter);
app.use('/opinions', opinionRouter);
app.use('/reservations', reservationRouter);

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id: id, nickname: "test"})
});

passport.use(new LocalStrategy(
  {
    usernameField: "nick",
    passwordField: 'password'
},
  function(nick, password, done) {
      if (nick=== 'admin' && password === 'admin') {
          return done(null, { name: "test", id: '1234'});
      } else {
          return done(null, false, { message: 'Incorrect cred.' });
      }
  })
)

app.post('/login',
      passport.authenticate('local', { 
          successRedirect: '/admin',
          failureRedirect: '/login'
     })
    );

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
