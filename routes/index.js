var express = require("express");
var router = express.Router();
const models = require("../models");

const Campaign = models.Campaign;
const Admin = models.Campaign;
const Comment = models.Comment;
const Submission = models.Submission;

const passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

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
// router.get(
//   "/profile",
//   require("connect-ensure-login").ensureLoggedIn(),
//   function(req, res) {
//     res.render("profile", { user: req.user });
//   }
// );

/* GET home page. */
router.get("/campaigns", ensureLoggedIn("/login"), function(req, res, next) {
  Campaign.findAll()
    .then(campaigns => {
      res.status(200).json(campaigns);
    })
    .catch(err => err);
});

router.post("/campaigns", async (req, res) => {
  // if logged in
  var name = req.body.name;
  var fields = JSON.stringify(req.body.fields);
  const campaign = await Campaign.create({ name: name, fields: fields });
  res.status(201).json(campaign);
});

router.get("/campaigns/:campaignId", ensureLoggedIn("/login"), function(
  req,
  res,
  next
) {
  Campaign.findByPk(req.params.campaignId)
    .then(campaign => {
      res.status(200).json(campaign);
    })
    .catch(err => err);
});

router.post("/admins", async (req, res) => {
  // if logged in
  var username = req.body.username;
  var pw = req.body.password;
  const admin = await models.Admin.create({ username: username, password: pw });
  res.status(201).json(admin);
});

router.get(
  "campaigns/:campaignId/submissions",
  ensureLoggedIn("/login"),
  function(req, res, next) {
    // if logged in

    const campaignId = req.params.campaignId;
    // new
    Campaign.findByPk(campaignId)
      .then(campaign => {
        campaign
          .getSubmissions()
          .then(submissions => {
            res.status(200).json(submissions);
          })
          .catch(err => err);
      })
      .catch(err => err);
    // old
    // var campaign = Campaign.findByPk(req.params.campaignId);
    // var submissions = campaign.getSubmissions();
    // res.status(200).json(submissions);
  }
);

router.post("campaigns/:campaignId/submissions", async (req, res) => {
  // if logged in
  var campaign = await Campaign.findByPk(req.params.campaignId);

  var email = req.body.email;
  var content = JSON.stringify(req.body.content);
  const submission = await models.Submission.create({
    email: email,
    content: content,
    status: 0
  });

  submission.setCampaign(campaign);
  campaign.addSubmission(submission);
  res.status(201).json(submission);
});

module.exports = router;
