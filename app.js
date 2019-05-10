var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require('dotenv').config()

//login
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//mail
var nodemailer = require("nodemailer");

//routes
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
      if (nick === "admin") {
        if (
          bcrypt.compareSync(
            password,
            "$2b$12$UbeX6QZDc6tCf.kh8sNiNu8K48FKaFc.P8K.CYIyF7A51wpd.xCxS"
          )
        ) {
          return done(null, { name: "admin", id: "1234" });
        } else {
          return done(null, false, { message: "Incorrect pass." });
        }
      } else {
        return done(null, false, { message: "Incorrect name" });
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
        expiresIn: 1200
      });
      return res.json({
        sucess: true,
        err: null,
        token
      });
    });
  })(req, res, next);
});

//mail
app.post("/send", (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const output = `
  Dzień dobry ${req.body[0].name}&nbsp;${req.body[0].surname},<br><br>
  Przed chwilą dokonałeś rezerwacji pokoju w terminie od <b>${req.body[1].dateFrom.slice(0,10)}</b> do <b>${req.body[1].dateTo.slice(0,10)}</b><br>
  Twój kod rezerwacji to <b>${req.body[1].id}</b>. Zapisz go, może Ci być jeszcze potrzebny.<br><br>
  W razie jakichkolwiek pytań odpowiedz na tego maila. 
  `;

  

  // setup email data with unicode symbols
  let mailOptions = {
    from: `<${process.env.MAIL_USER}>`,
    to: `${req.body[0].mail}`, // list of receivers
    subject: "Rezerwacja",
    html: output
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    res.send(JSON.stringify(200));
  });
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
