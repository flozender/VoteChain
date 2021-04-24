var Voting = artifacts.require('../contracts/Voting.sol');
const fs = require('fs');
const path = require('path');
const metaDataPath = path.resolve('../../server/blockchain/Metadata.js');
console.log('Writing to: ', metaDataPath);
module.exports = function (deployer) {
  deployer.deploy(Voting).then(() => {
    fs.writeFile(
      metaDataPath,
      'const ADDRESS = ' + "'" + Voting.address + "';",
      err => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
    fs.appendFile(
      metaDataPath,
      '\nconst ABI = ' + JSON.stringify(Voting.abi) + ';',
      err => {
        if (err) {
          console.log(err);
        } else {
          fs.appendFile(
            metaDataPath,
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
