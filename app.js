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

const passport = require("passport");
const Strategy = require("passport-local").Strategy;

let demoAdmin = { username: "foo@example.com", password: "barbaz" };
Admin.create(demoAdmin);
Admin.findOne()
  .then(user => (demoAdmin = user))
  .catch(err => Admin.create(demoAdmin));

passport.use(
  new Strategy(function(username, password, cb) {
    Admin.findOne({ username: username }, function(err, admin) {
      if (err) {
        return cb(err);
      }
      if (!admin) {
        return cb(null, false);
      }
      // if (!admin.verifyPassword(password)) {
      if (admin.password != password) {
        return cb(null, false);
      }
      return db(null, admin);
    });
  })
);

passport.serializeUser(function(admin, cb) {
  cb(null, admin.id);
});

passport.deserializeUser(function(id, cb) {
  Admin.findOne({ where: { id: id } })
    .then(admin => {
      cb(null, admin);
    })
    .catch(err => cb(err));
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// passport setup demo login POST route
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

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
