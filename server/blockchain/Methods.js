const Contract = require('./Contract');
const Provider = require('./Provider');
const provider = new Provider();
const contract = new Contract();
const web3 = provider.web3;
const instance = contract.initContract();

let smartContract = {
  addElection: async electionID => {
    let accounts = await web3.eth.getAccounts();
    let receipt = await instance.methods
      .addElection(electionID)
      .send({ from: accounts[0] });
    console.log(receipt.transactionHash);
    return receipt;
  },

  addParty: async (partyID, electionID) => {
    let accounts = await web3.eth.getAccounts();
    let receipt = await instance.methods
      .addParty(partyID, electionID)
      .send({ from: accounts[0], gas: 3000000 });
    console.log(receipt.transactionHash);
    return receipt;
  },

  addCandidateElection: async (candidateID, electionID, regionID, partyID) => {
    let accounts = await web3.eth.getAccounts();
    let receipt = await instance.methods
      .addCandidateElection(candidateID, electionID, regionID, partyID)
      .send({ from: accounts[0], gas: 3000000 });
    console.log(receipt.transactionHash);
    return receipt;
  },

  vote: async (voterID, electionID, regionID, candidateID) => {
    let accounts = await web3.eth.getAccounts();
    let receipt = await instance.methods
      .vote(voterID, electionID, regionID, candidateID)
      .send({ from: accounts[0], gas: 3000000 });
    console.log(receipt.transactionHash);
    return receipt;
  },

  getNumOfElections: async () => {
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
    let votes = await instance.methods
      .getVotesForCandidate(candidateID, electionID, regionID)
      .call()
      .then(value => {
        console.log('Number of votes: ', value);
        return value;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
    return votes;
  },

  getGlobalWinners: async (partyID, electionID) => {
    let accounts = await web3.eth.getAccounts();
    let votes = await instance.methods
      .getVotesForParty(partyID, electionID)
      .call()
      .then(value => {
        console.log('Number of votes for partyID: ', partyID, value);
        return value;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
    return votes;
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
