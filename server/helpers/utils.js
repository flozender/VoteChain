const fs = require ('fs');
const readfile = require('fs-readfile-promise');
const jwt = require('jsonwebtoken');

exports.addToken = async (user) => {
  try {
    let key = await readfile('config/id_rsa', 'base64');
    user.exp = Math.floor(Date.now() / 1000) + (60 * 500);
    let token = jwt.sign(user, key.toString());
    return {
      success: true,
      username: user.username,
      id: user.id,
      name: user.name,
      token
    }
  } catch (err) {
    throw err;
  }
};