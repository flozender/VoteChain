var jwt = require('jsonwebtoken'),
  readfile = require('fs-readfile-promise');

let fetchData = function (req, res) {
  let auth_token = req.headers.authorization;

  if (auth_token) {
    return auth_token.split(' ')[1];
  }
};

module.exports = {
  adminTokenValidate: function (req, res, next) {
    let token = fetchData(req, res);
    if (token) {
      let decoded_data = {};
      let auth = false;

      readfile('config/id_rsa', 'base64')
        .then((key_value) => {
          jwt.verify(token, key_value.toString(), function (error, decoded) {
            if (error) {
              return res.send({
                not_verified: true,
                message: 'Session expired. Please logout and login once again',
              });
            } else {
              if (decoded.type == 'admin') {
                auth = true;
                decoded_data = decoded;
                req.token_data = {
                  data: decoded_data,
                  auth: auth,
                };
                res.locals.type = decoded_data.type;
                next();
              } else {
                return res.status(403).send({
                  success: false,
                  message: 'Not Authorised',
                });
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    } else {
      return res
        .status(403)
        .send({ success: false, message: 'Not Authorised' });
    }
  },

  tokenValidate: function (req, res, next) {
    let token = fetchData(req, res);
    console.log(token);
    if (token) {
      let decoded_data = {};
      let auth = false;

      readfile('config/id_rsa', 'base64')
        .then((key_value) => {
          jwt.verify(token, key_value.toString(), function (error, decoded) {
            if (error) {
              return res.send({
                not_verified: true,
                message: 'Session expired. Please logout and login once again',
              });
            } else {
              if (decoded.type == 'voter') {
                auth = true;
                decoded_data = decoded;
                req.token_data = {
                  data: decoded_data,
                  auth: auth,
                };
                res.locals.type = decoded_data.type;
                next();
              } else {
                return res.status(403).send({
                  success: false,
                  message: 'Not Authorised',
                });
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    } else {
      return res
        .status(403)
        .send({ success: false, message: 'Not Authorised' });
    }
  },
};
