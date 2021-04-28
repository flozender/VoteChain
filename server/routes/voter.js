const auth = require('../middleware/auth');

module.exports = app => {
  const voterController = require('../controllers/voter.js');
  const electionController = require('../controllers/election.js');
  const candidateController = require('../controllers/candidate.js');

  app.post('/auth', async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.id = body.voterId || null;
      body.dob = body.dob || null;

      let data = await voterController.verifyVoterAndSendOTP(body);
      if (data && data.success) {
        res.status(200).send(data);
      } else {
        res.status(403).send({
          success: false,
          message: data.message,
        });
      }
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.post('/otp', async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.id = body.voterId || null;
      body.dob = body.dob || null;

      let data = await voterController.verifyOTP(body);
      if (data && data.success) {
        res.send({
          success: true,
          message: 'Logged In Successfully',
          token: data.token,
          voter: {
            voterId: body.voterId,
            name: data.name,
          },
        });
      } else {
        res.send({
          success: false,
          message: data.message,
        });
      }
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.post('/vote', auth.tokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.id = req.token_data.data.id;
      body.regionID = req.token_data.data.regionID;
      let vote = await voterController.vote(body);
      res.status(200).send(vote);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.get(
    '/getRegionWiseVotes/:electionId',
    auth.tokenValidate,
    async (req, res) => {
      try {
        let votes = await electionController.getRegionWiseVotes(
          req.params.electionId
        );
        res.status(200).send(votes);
      } catch (error) {
        res.status(400).send({
          error: JSON.stringify(error),
        });
      }
    }
  );

  app.get('/voter/:voterId', auth.tokenValidate, async (req, res) => {
    try {
      let voter = await voterController.getVoter(req.params.voterId);
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.get('/profile', auth.tokenValidate, async (req, res) => {
    try {
      let voter = await voterController.profile(req.token_data.data.id);
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.get(
    '/elections/getAssignedCandidates/:electionId',
    auth.tokenValidate,
    async (req, res) => {
      try {
        let candidates = await candidateController.getAssignedCandidatesElectionFromVoter(
          req.params.electionId,
          req.token_data.data.id
        );
        res.status(200).send(candidates);
      } catch (error) {
        res.status(400).send({
          error: JSON.stringify(error),
        });
      }
    }
  );

  app.get('/eligibleElections', auth.tokenValidate, async (req, res) => {
    try {
      let voterId = req.token_data.data.id;
      let voter = await voterController.getEligibleElections(voterId);
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });
};
