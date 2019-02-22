var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

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


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use("/", indexRouter);
app.use("/clients", clientRouter);
app.use("/rooms", roomRouter);
app.use("/opinions", opinionRouter);
app.use("/reservations", reservationRouter);

//passport
app.use(passport.initialize());
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

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err || !user) {
      const error = new Error("An Error occured");
      return next(error);
    }
    req.login(user, { session: false }, async error => {
      if (error) return next(error);
      const body = { _id: user.id, name: user.name };
      const token = jwt.sign({ nick: body.name }, "top_secret", {
        expiresIn: 600
      });
      return res.json({
        sucess: true,
        err: null,
        token
      });
    });
  })(req, res, next);
});

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
