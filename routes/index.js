var express = require("express");
var router = express.Router();

const passport = require("passport");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// passport setup demo index GET route
router.get("/", function(req, res, next) {
  console.log(req.session);
  res.render("index", { title: "Express", user: req.user });
});

// passport setup demo login GET route
router.get("/login", function(req, res, next) {
  res.render("login");
});

// passport setup demo login POST route
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res, next) {
    res.redirect("/");
  }
);

// passport setup demo logout GET route
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// passport setup demo GET route
router.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function(req, res) {
    res.render("profile", { user: req.user });
  }
);

module.exports = router;
