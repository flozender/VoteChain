const fs = require('fs');
const readfile = require('fs-readfile-promise');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const handlebars = require('handlebars');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAuthClientID,
  process.env.OAuthClientSecret,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAuthRefreshToken,
});

exports.addToken = async user => {
  try {
    let key = await readfile('config/id_rsa', 'base64');
    user.exp = Math.floor(Date.now() / 1000) + 60 * 500;
    let token = jwt.sign(user, key.toString());
    return {
      success: true,
      username: user.username,
      id: user.id,
      name: user.name,
      token,
      user,
    };
  } catch (err) {
    throw err;
  }
};

exports.sendEmailWithOTP = async (voterName, voterEmail, otp) => {
  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
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
    .readFileSync(path.join(__dirname, '../templates/email.html'))
    .toString();
  const template = handlebars.compile(html);
  const replacements = {
    voterName,
    otp,
  };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: process.env.EMAIL,
    to: voterEmail,
    subject: 'VoteChain - One Time Password',
    generateTextFromHTML: true,
    html: htmlToSend,
  };

  const result = await transporter.sendMail(mailOptions);
  transporter.close();
  return result;
};

exports.sendVoteSuccessEmail = async (voterName, electionName) => {
  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
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
    .readFileSync(path.join(__dirname, '../templates/thanks.html'))
    .toString();
  const template = handlebars.compile(html);
  const replacements = {
    voterName,
    electionName,
  };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: process.env.EMAIL,
    to: voterEmail,
    subject: 'VoteChain - Thanks for Voting!',
    generateTextFromHTML: true,
    html: htmlToSend,
  };

  const result = await transporter.sendMail(mailOptions);
  transporter.close();
  return result;
};
