let autho = require("../middleware/auth");
module.exports = (app) => {
  const voterController = require("../controllers/voter.js");
  const adminController = require("../controllers/admin.js");
  app.use("/", autho.adminTokenValidate);

  app.post("/admin/auth", async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await adminController.verifyAndAuthorize(body);
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: "Logged In Successfully",
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
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.post("/admin/createVoter", async (req, res) => {
    try {
      let body = Object.assign({}, req.body);

      let data = await voterController.createVoter(body);
      if (data && data.success) {
        res.status(200).send({
          success: true,
          message: "Created Voter Successfully",
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

  app.put("/admin/updateVoter/:voterId", async (req, res) => {
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

  app.get("/admin/voters", async (req, res) => {
    try {
      let voters = await voterController.getAllVoters();
      res.status(200).send(voters);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error),
      });
    }
  });

  app.get("/admin/voter/:voterId", async (req, res) => {
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
