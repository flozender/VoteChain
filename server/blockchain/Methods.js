const Contract = require('./Contract');
const Provider = require('./Provider');
const provider = new Provider();
const contract = new Contract();
const web3 = provider.web3;
const instance = contract.initContract();
let contract = {
  addElection: async electionID => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .addElection(electionID)
      .send({ from: accounts[0] })
      .then(receipt => console.log(receipt.transactionHash))
      .catch(err => console.log(err));
  },

  addCandidateElection: async (candidateID, electionID, regionID) => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .addCandidateElection(candidateID, electionID, regionID)
      .send({ from: accounts[0] })
      .then(receipt => console.log(receipt.transactionHash))
      .catch(err => console.log(err));
  },

  getNumOfElections: async () => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .getNumOfElections()
      .call()
      .then(value => console.log('Number of elections: ', value))
      .catch(err => console.log(err));
  },
};
module.exports = contract;
