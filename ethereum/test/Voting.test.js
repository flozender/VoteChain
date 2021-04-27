const Voting = artifacts.require('Voting');

contract('Checking Initial values', async accounts => {
  it('party should not exist', () =>
    Voting.deployed().then(async instance => {
      let response = await instance.getPartyID.call(1, 1);
      assert.equal(response.toNumber(), -1, 'Party Exists');
    }));

  it('candidate should not exist', () =>
    Voting.deployed().then(async instance => {
      let response = await instance.getCandidateID.call(1, 1, 1);
      assert.equal(response.toNumber(), -1, 'Candidate Exists');
    }));
});

contract('Voting Process', async accounts => {
  it('should create election 1', () =>
    Voting.deployed().then(async instance => {
      await instance.addElection(1, { from: accounts[0] });
      let response = await instance.getNumOfElections.call();
      assert.equal(response.toNumber(), 1, 'Election Not Added');
    }));

  it('should create party 1', () =>
    Voting.deployed().then(async instance => {
      await instance.addParty(1, 1, { from: accounts[0] });
      let response = await instance.getNumOfParties.call(1);
      assert.equal(response.toNumber(), 1, 'Party Not Added');
    }));

  it('should create party 2', () =>
    Voting.deployed().then(async instance => {
      await instance.addParty(2, 1, { from: accounts[0] });
      let response = await instance.getNumOfParties.call(1);
      assert.equal(response.toNumber(), 2, 'Party Not Added');
    }));

  it('should create candidate 1 for party 1 in region 1', () =>
    Voting.deployed().then(async instance => {
      await instance.addCandidateElection(1, 1, 1, 1, { from: accounts[0] });
      let response = await instance.getNumOfCandidates.call(1);
      assert.equal(response.toNumber(), 1, 'Candidate Not Added');
    }));

  it('should create candidate 2 for party 2 in region 1', () =>
    Voting.deployed().then(async instance => {
      await instance.addCandidateElection(2, 1, 1, 2, { from: accounts[0] });
      let response = await instance.getNumOfCandidates.call(1);
      assert.equal(response.toNumber(), 2, 'Candidate Not Added');
    }));

  it('should create candidate 3 for party 1 in region 2', () =>
    Voting.deployed().then(async instance => {
      await instance.addCandidateElection(3, 1, 2, 1, { from: accounts[0] });
      let response = await instance.getNumOfCandidates.call(1);
      assert.equal(response.toNumber(), 3, 'Candidate Not Added');
    }));

  it('should cast a vote for candidate 1 in region 1', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234410', 1, 1, 1, { from: accounts[0] });
      let response = await instance.getVotesForCandidate.call(1, 1, 1);
      assert.equal(response.toNumber(), 1, 'Vote not cast');
    }));

  it('should cast three votes for candidate 2 in region 1', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234411', 1, 1, 2, { from: accounts[0] });
      await instance.vote('WRH2234412', 1, 1, 2, { from: accounts[0] });
      await instance.vote('WRH2234413', 1, 1, 2, { from: accounts[0] });
      let response = await instance.getVotesForCandidate.call(2, 1, 1);
      assert.equal(response.toNumber(), 3, 'Votes not cast');
    }));

  it('should cast a vote for candidate 3 in region 2', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234414', 1, 2, 3, { from: accounts[0] });
      let response = await instance.getVotesForCandidate.call(3, 1, 2);
      assert.equal(response.toNumber(), 1, 'Votes not cast');
    }));

  it('should get correct votes for party 1', () =>
    Voting.deployed().then(async instance => {
      let response = await instance.getVotesForParty.call(1, 1);
      assert.equal(response.toNumber(), 2, 'Votes not correct');
    }));

  it('should get correct votes for party 2', () =>
    Voting.deployed().then(async instance => {
      let response = await instance.getVotesForParty.call(2, 1);
      assert.equal(response.toNumber(), 3, 'Votes not correct');
    }));
});

contract('Candidate checks', async accounts => {
  let catchRevert = require('./exceptions.js').catchRevert;

  it('should not allow multiple candidates from one party in same region', () =>
    Voting.deployed().then(async instance => {
      await instance.addCandidateElection(1, 1, 1, 1, { from: accounts[0] });
      await catchRevert(
        instance.addCandidateElection(2, 1, 1, 1, { from: accounts[0] })
      );
    }));

  it('should not allow same candidate to multiple regions', () =>
    Voting.deployed().then(async instance => {
      await instance.addCandidateElection(3, 1, 1, 3, { from: accounts[0] });
      await catchRevert(
        instance.addCandidateElection(3, 1, 2, 3, { from: accounts[0] })
      );
    }));
});

contract('Voting checks', async accounts => {
  let catchRevert = require('./exceptions.js').catchRevert;

  before(done => {
    Voting.deployed().then(async instance => {
      await instance.addElection(1, { from: accounts[0] });
      await instance.addParty(1, 1, { from: accounts[0] });
      await instance.addParty(2, 1, { from: accounts[0] });
      await instance.addCandidateElection(1, 1, 1, 1, { from: accounts[0] });
      await instance.addCandidateElection(2, 1, 1, 2, { from: accounts[0] });
      await instance.addCandidateElection(3, 1, 2, 1, { from: accounts[0] });
      await instance.addCandidateElection(4, 1, 2, 99, { from: accounts[0] });
      done();
    });
  });

  it('should cast votes from different voters', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234411', 1, 1, 1, { from: accounts[0] });
      await instance.vote('WRH2234412', 1, 1, 1, { from: accounts[0] });
      let response = await instance.getVotesForCandidate.call(1, 1, 1);
      assert.equal(response.toNumber(), 2, 'Votes were not cast');
    }));

  it('should prevent double voting', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234413', 1, 1, 1, { from: accounts[0] });
      await catchRevert(
        instance.vote('WRH2234413', 1, 1, 1, { from: accounts[0] })
      );
    }));

  it('should cast votes to different regions', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234414', 1, 1, 2, { from: accounts[0] });
      await instance.vote('WRH2234415', 1, 2, 3, { from: accounts[0] });
      let response1 = await instance.getVotesForCandidate.call(2, 1, 1);
      let response2 = await instance.getVotesForCandidate.call(3, 1, 2);
      assert.equal(
        response1.toNumber() + response2.toNumber(),
        2,
        'Votes were not cast'
      );
    }));

  it('should prevent single voter voting in multiple regions', () =>
    Voting.deployed().then(async instance => {
      await instance.vote('WRH2234416', 1, 1, 1, { from: accounts[0] });
      await catchRevert(
        instance.vote('WRH2234416', 1, 2, 1, { from: accounts[0] })
      );
    }));

  it('should prevent voting for unknown election', () =>
    Voting.deployed().then(async instance => {
      await catchRevert(
        instance.vote('WRH2234499', 99, 2, 1, { from: accounts[0] })
      );
    }));

  it('should prevent voting for unknown candidate', () =>
    Voting.deployed().then(async instance => {
      await catchRevert(
        instance.vote('WRH2234499', 1, 2, 99, { from: accounts[0] })
      );
    }));

  it('should prevent voting for unknown party', () =>
    Voting.deployed().then(async instance => {
      await catchRevert(
        instance.vote('WRH2234499', 1, 2, 4, { from: accounts[0] })
      );
    }));
});
