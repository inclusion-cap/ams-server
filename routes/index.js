var express = require('express');
var router = express.Router();

import models from './models';

const app = express();
app.use(express.json());


app.use((req, res, next) => {
	req.context = {
		models,
		me: models.admin[1],
	};
	next();
});

/* GET home page. */
router.get('/', async (req, res) => {
	// if logged in
  const campaigns = await req.context.models.Campaign.findAll();
  return res.send(campaigns);
});

/* GET campaign page. */
router.get('/campaign/:id', async (req, res) => {
	const campaign = await req.context.models.Campaign.findByPk(
		req.params.campaignId,
	);

	return res.send(campaign);
});

/* POST a new campaign. */
router.post('/campaign/:id', async (req, res) => {
	// if logged in
	let name = req.body.name;
	let fields = req.body.fields;
  const campaign = await req.context.models.Campaign.create({
  	name: name,
    fields: fields,
  });

  return res.send(campaign);
});


/* DELETE a campaign. */
router.delete('/campaign/:id', async (req, res) => {
	// if logged in
	let id = req.params.campaignId;
  const result = await req.context.models.Campaign.destroy({
  	where: { id: id },
  });

  return res.send(campaign);
});


/* GET submission page. */
router.get('/campaign/:id/submission/:id', async (req, res) => {
	// if logged in
	let submissionId = req.params.submissionId;
	let submission = await req.context.models.Submission.findByPk(
		submissionId,
	);

	let comments = await req.context.models.Comments.findAll(
		where: {
			submission_id: submissionId
		}
	);

	results = {"submission": submission, "comments": comments}

	return res.send(results);
});

/* POST a new submission. */
router.post('/campaign/:id/submission/:id', async (req, res) => {
  const submission = await req.context.models.Submission.create({
  	email: req.body.email,
    content: req.body.fields,
    status: 0,
  });

  return res.send("Submission Successful");
});

module.exports = router;
