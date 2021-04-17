var Voting = artifacts.require("../contracts/Voting.sol");

module.exports = function (deployer) {
  deployer.deploy(Voting);
};
