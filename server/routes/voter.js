const auth = require('../middleware/auth');
const utils = require('../helpers/utils');

module.exports = (app) => {
  const voterController = require('../controllers/voter.js');

  app.post('/auth', async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.id = body.voterId || null;
      body.dob = body.dob || null;

      let data = await voterController.verifyUserAndSendOTP(body);
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

  app.post('/otp', async (req, res) => {
    let body = Object.assign({}, req.body);
    body.id = body.voterId || null;
    body.dob = body.dob || null;

    const response = await utils.sendEmailWithOTP(
      'VoteChain User',
      'votechain.iare@gmail.com',
      '000000',
    );
    res.json({
      ...response,
    });
  });

  app.get('/voter/:voterId', async (req, res) => {
    try {
      let voter = await voterController.getVoter(req.params.voterId);
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });
};
