const Contract = require('./Contract');
const Provider = require('./Provider');
const provider = new Provider();
const contract = new Contract();
const web3 = provider.web3;
const instance = contract.initContract();
let smartContract = {
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

  vote: async (voterID, electionID, regionID, candidateID) => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .vote(voterID, electionID, regionID, candidateID)
      .send({ from: accounts[0] })
      .then(receipt => console.log(receipt.transactionHash))
      .catch(err => console.log(err));
  },

  getNumOfElections: async () => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .getNumOfElections()
      .call()
      .then(value => {
        console.log('Number of elections: ', value);
        return value;
      })
      .catch(err => console.log(err));
  },
  getRegionWiseCandidateVotes: async (candidateID, electionID, regionID) => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .getVotesForCandidate(candidateID, electionID, regionID)
      .call()
      .then(value => {
        console.log('Number of elections: ', value);
        return value;
      })
      .catch(err => console.log(err));
  },
};
module.exports = smartContract;
