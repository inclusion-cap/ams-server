require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Import sequelize
const db = require("./models");
// Import sequelize models
const Admin = db.Admin;
const Campaign = db.Campaign;
const Submission = db.Submission;
const Comment = db.Comment;

var session = require("express-session");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// let demoAdmin = { username: "foo@example.com", password: "barbaz" };
// // Admin.create(demoAdmin);
// Admin.findOne()
//   .then(user => console.log(user))
//   .catch(err => Admin.create(demoAdmin));

passport.use(
  "local",
  new LocalStrategy(function(username, password, done) {
    Admin.findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorect username" });
        }
        // if (!user.verifyPassword(password)) {
        if (user.password != password) {
          return done(null, false, { message: "Incorrect password" });
        }
        console.log(user);
        return done(null, user);
      })
      .catch(err => err);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Admin.findOne({ where: { id: id } })
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

var sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
