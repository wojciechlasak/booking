var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

var indexRouter = require("./routes/index");
var clientRouter = require("./routes/clients");
var roomRouter = require("./routes/rooms");
var opinionRouter = require("./routes/opinions");
var reservationRouter = require("./routes/reservations");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

//app.use(passport.authenticate('jwt', {session: false }));
app.use("/", indexRouter);
app.use("/clients",clientRouter);
app.use("/rooms", roomRouter);
app.use("/opinions", opinionRouter);
app.use("/reservations", reservationRouter);


//passport
app.use(passport.initialize());
//app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "nick",
      passwordField: "password"
    },
    function(nick, password, done) {
      if (nick === "admin" && password === "admin") {
        return done(null, { name: "admin", id: "1234" });
      } else {
        return done(null, false, { message: "Incorrect cred." });
      }
    }
  )
);

/*passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id: id, name: "admin" });
});

app.post('/*',
      passport.authenticate('local', { 
          successRedirect: '/#/admin',
          failureRedirect: '/#/login'
     })
    );*/

    app.post("/login", async (req, res, next) => {
      passport.authenticate("local", async (err, user, info) => {  
        if(err || !user){
          const error = new Error('An Error occured')
          return next(error)
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const body = { _id : user.id, name : user.name };
          const token = jwt.sign({ user : body },'top_secret');
          return res.json("ok");
        });     
    })(req, res, next);
    });



passport.use(new JWTstrategy({
  secretOrKey : 'top_secret',
  //we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
