var Voting = artifacts.require('../contracts/Voting.sol');
const fs = require('fs');
const path = '../../../server/blockchain/Metadata.js';
module.exports = function (deployer) {
  deployer.deploy(Voting).then(() => {
    fs.writeFile(
      __dirname + path,
      'const ADDRESS = ' + "'" + Voting.address + "';",
      err => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
    fs.appendFile(
      __dirname + path,
      '\nconst ABI = ' + JSON.stringify(Voting.abi) + ';',
      err => {
        if (err) {
          console.log(err);
        } else {
          fs.appendFile(
            __dirname + path,
            '\nmodule.exports = { ADDRESS, ABI };',
            err => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    );
  });
};
