const auth = require('../middleware/auth');

module.exports = (app) => {
  const voterController = require('../controllers/voter.js');

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

  app.get('/eligibleElections', auth.tokenValidate, async (req, res) => {
    try {
      let voterId = req.token_data.data.voterId;
      let voter = await voterController.getEligibleElections(voterId);
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

};
