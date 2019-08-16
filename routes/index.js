var models  = require('../models');

var express = require('express');
var router = express.Router();

const app = express();
const port = 3000;


/* GET home page. */
router.get('/campaigns', async (req, res) => {
	// if logged in
	var data = await models.Campaign.findAll();
  res.status(200).json(data);
});

router.post('/campaigns', async (req, res) => {
	// if logged in
	var name = req.body.name;
	var fields = JSON.stringify(req.body.fields);
	const campaign = await models.Campaign.create({ "name": name, "fields": fields });
	res.status(201).json(campaign);

});

router.get('/campaigns/:campaignId', async (req, res) => {
	var data = await models.Campaign.findByPk(req.params.campaignId);
	res.status(200).json(data);
});

router.post('/admins', async (req, res) => {
	// if logged in
	var username = req.body.username;
	var pw = req.body.password;
  const admin = await models.Admin.create({ "username": username, "password": pw });
	res.status(201).json(admin);
});

router.get('campaigns/:campaignId/submissions', async (req, res) => {
	// if logged in
	var campaign = await models.Campaign.findByPk(req.params.campaignId);
	var submissions = campaign.getSubmissions();
	res.status(200).json(submissions);

});

router.post('campaigns/:campaignId/submissions', async (req, res) => {
	// if logged in
	var campaign = await models.Campaign.findByPk(req.params.campaignId);

  var email = req.body.email;
  var content = JSON.stringify(req.body.content);
  const submission = await models.Submission.create({
  	"email": email,
  	"content": content,
  	"status": 0
  });

  submission.setCampaign(campaign);
  campaign.addSubmission(submission);
  res.status(201).json(submission);

});







module.exports = router;
