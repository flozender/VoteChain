const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const handlebars = require("handlebars");
const autho = require("../middleware/auth");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAuthClientID,
  process.env.OAuthClientSecret,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAuthRefreshToken,
});

module.exports = (app) => {
  const voterController = require("../controllers/voter.js");
  app.use("/", autho.tokenValidate);

  app.post("/auth", async (req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.id = body.voterId || null;
      body.dob = body.dob || null;

      let data = await voterController.verifyUserAndSendOTP(body);
      if (data && data.success) {
        res.send({
          success: true,
          message: "Logged In Successfully",
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

  app.post("/otp", (req, res) => {
    let body = Object.assign({}, req.body);
    body.id = body.voterId || null;
    body.dob = body.dob || null;

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "votechain.iare@gmail.com",
        clientId: process.env.OAuthClientID,
        clientSecret: process.env.OAuthClientSecret,
        refreshToken: process.env.OAuthRefreshToken,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = fs
      .readFileSync(path.join(__dirname, "../templates/email.html"))
      .toString();
    const template = handlebars.compile(html);
    const replacements = {
      name: "VoteChain", // add voter's name here
      otp: "203051", // add dynamic OTP here
    };
    const htmlToSend = template(replacements);

    const mailOptions = {
      from: "votechain.iare@gmail.com",
      to: "votechain.iare@gmail.com", // Add the voter's email here
      subject: "VoteChain Platform - OTP",
      generateTextFromHTML: true,
      html: htmlToSend,
    };

    smtpTransport.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
      smtpTransport.close();
      res.json({
        success: true,
        message: "Email sent",
      });
    });
  });

  app.get("/voter/:voterId", async (req, res) => {
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
