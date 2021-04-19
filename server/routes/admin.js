let auth = require(`../middleware/auth`);
module.exports = app => {
  const voterController = require(`../controllers/voter.js`);
  const adminController = require(`../controllers/admin.js`);
  const electionController = require(`../controllers/election.js`);
  const candidateController = require(`../controllers/candidate.js`);

  app.post(`/admin/auth`, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await adminController.verifyAndAuthorize(body);
      if (data && data.success) {
        res.status(200).send(data);
      } else {
        res.status(200).send({
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

  app.post(`/admin/otp`, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await adminController.verifyOTP(body);
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: `Logged In Successfully`,
          token: data.token,
          admin: {
            adminId: data.user.adminId,
            name: data.name,
            username: data.username,
          },
        });
      } else {
        res.status(200).send({
          success: false,
          message: data.message,
        });
      }
    } catch (error) {

    }
  })

  app.post(`/admin/createVoter`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await voterController.createVoter(body);
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: `Created Voter Successfully`,
        });
      } else {
        res.status(200).send({
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

  app.put(`/admin/updateVoter/:voterId`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await voterController.updateVoter(body, req.params.voterId);
      if (data && data.success) {
        res.status(200).send(data);
      } else {
        res.status(200).send({
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

  app.get(`/admin/voters`, auth.adminTokenValidate, async (req, res) => {
    try {
      let voters = await voterController.getAllVoters();
      res.status(200).send(voters);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.get(`/admin/voter/:voterId`, auth.adminTokenValidate, async (req, res) => {
    try {
      let voter = await voterController.getVoter(req.params.voterId);
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.get(`/admin/elections`, auth.adminTokenValidate, async (req, res) => {
    try {
      let voter = await electionController.getAll();
      res.status(200).send(voter);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.post(`/admin/createElection`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await electionController.createElection(body);
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: `Created Election Successfully`,
        });
      } else {
        res.status(200).send({
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

  app.post(`/admin/assignCandidates/:electionId`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await electionController.assignCandidates(
        body,
        req.params.electionId
      );
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: `Created Election Successfully`,
        });
      } else {
        res.status(200).send({
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

  app.delete(`/admin/deleteAssignedCandidates/:electionId`, auth.adminTokenValidate,
    async (req, res) => {
      try {
        let body = Object.assign({}, req.body);

        let data = await electionController.deleteAssignedCandidates(
          body,
          req.params.electionId
        );
        if (data && data.success) {
          res.status(200).send({
            success: true,
            message: `Created Election Successfully`,
          });
        } else {
          res.status(200).send({
            success: false,
            message: data.message,
          });
        }
      } catch (error) {
        res.status(400).send({
          error: JSON.stringify(error),
        });
      }
    }
  );

  app.put(`/admin/updateElection/:electionId`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await electionController.updateElection(
        body,
        req.params.electionId
      );
      if (data && data.success) {
        res.status(200).send(data);
      } else {
        res.status(200).send({
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

  app.get(`/admin/candidates`, auth.adminTokenValidate, async (req, res) => {
    try {
      let candidates = await candidateController.getAllCandidates();
      res.status(200).send(candidates);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.post(`/admin/createCandidate`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await candidateController.createCandidate(body);
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: `Created Election Successfully`,
        });
      } else {
        res.status(200).send({
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

  app.put(`/admin/updateCandidate/:candidateId`, auth.adminTokenValidate, async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await candidateController.updateCandidate(
        body,
        req.params.candidateId
      );
      if (data && data.success) {
        res.status(200).send(data);
      } else {
        res.status(200).send({
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

  app.delete(`/admin/deleteCandidate/:candidateId`, auth.adminTokenValidate, async (req, res) => {
    try {
      let data = await candidateController.deleteCandidate(
        req.params.candidateId
      );
      if (data && data.success) {
        res.status(200).send(data);
      } else {
        res.status(200).send({
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
};
