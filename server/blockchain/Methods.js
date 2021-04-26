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
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  addParty: async (partyID, electionID) => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .addParty(partyID, electionID)
      .send({ from: accounts[0] })
      .then(receipt => console.log(receipt.transactionHash))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  addCandidateElection: async (candidateID, electionID, regionID, partyID) => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .addCandidateElection(candidateID, electionID, regionID, partyID)
      .send({ from: accounts[0] })
      .then(receipt => console.log(receipt.transactionHash))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  vote: async (voterID, electionID, regionID, candidateID) => {
    let accounts = await web3.eth.getAccounts();
    instance.methods
      .vote(voterID, electionID, regionID, candidateID)
      .send({ from: accounts[0] })
      .then(receipt => console.log(receipt.transactionHash))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  getNumOfElections: async () => {
    instance.methods
      .getNumOfElections()
      .call()
      .then(value => console.log('Number of elections: ', value))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  getNumOfCandidates: async electionID => {
    instance.methods
      .getNumOfCandidates(electionID)
      .call()
      .then(value => console.log('Number of candidates: ', value))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  getNumOfParties: async electionID => {
    instance.methods
      .getNumOfParties(electionID)
      .call()
      .then(value => console.log('Number of parties: ', value))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  getCountOfParties: async () => {
    instance.methods
      .getCountOfParties()
      .call()
      .then(value => console.log('Count of parties: ', value))
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
};
module.exports = smartContract;
