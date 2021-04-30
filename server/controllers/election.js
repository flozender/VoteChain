const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const Bluebird = require('bluebird');
const moment = require('moment');
const smartContract = require('../blockchain/Methods');
const electionRepo = require('../models/electionRepo.js');
const regionRepo = require('../models/regionRepo.js');
const candidateElectionRepo = require('../models/candidateElectionRepo.js');
const candidateRepo = require('../models/candidateRepo.js');
const election = require('../models/election.js');
const partyRepo = require('../models/partyRepo.js');

exports.getAllElections = async () => {
  try {
    let elections = await electionRepo.getAll({ exclude: [] });
    await Bluebird.each(elections, async element => {
      element.active =
        !element.winner &&
        moment()
          .utc()
          .isBetween(
            moment(element.startDate).utc(),
            moment(element.endDate).utc()
          )
          ? 1
          : 0;
      element.candidates = await candidateElectionRepo.getAssignedCandidatesElectionForAdmin(
        element.id
      );
      element.candidates.forEach(candidate => {
        candidate.candidate = candidate.candidate
          ? JSON.parse(candidate.candidate)
          : null;
        candidate.region = candidate.region
          ? JSON.parse(candidate.region)
          : null;
      });
      if (element.assemblyConstituencies != null) {
        element.regions = element.assemblyConstituencies.split(',').map(Number);
        let regions = await electionRepo.getAllRegionsForElection(
          element.id,
          element.regions
        );
        element.assemblyConstituencies = JSON.parse(regions.regions);
        delete element.regions;
      }
    });
    return {
      success: true,
      elections,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.createElection = async data => {
  try {
    let election = await electionRepo.add(data);
    let receipt = await smartContract.addElection(election.id);
    return {
      success: true,
      message: `Election Created Successfully`,
      election,
      receipt,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.data[Object.keys(err.data)[0]].reason,
    };
  }
};

exports.getElection = async electionId => {
  try {
    let election = await electionRepo.get({ exclude: [] }, { id: electionId });
    election.regions = election.assemblyConstituencies.split(',').map(Number);
    let regions = await electionRepo.getAllRegionsForElection(
      election.id,
      election.regions
    );
    election.assemblyConstituencies = JSON.parse(regions.regions);
    delete election.regions;
    return {
      success: true,
      election,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateElection = async (details, electionId) => {
  try {
    await electionRepo.update(details, { id: electionId });
    return {
      success: true,
      message: `Updated Successfully`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.assignCandidates = async (details, electionID) => {
  try {
    electionID = parseInt(electionID);
    await Bluebird.each(details.candidates, async candidate => {
      let cand = await candidateRepo.get(['partyID'], {
        id: candidate.candidateID,
      });
      candidate.electionID = electionID;
      await smartContract.addParty(cand.partyID, electionID);
      await smartContract.addCandidateElection(
        candidate.candidateID,
        electionID,
        candidate.regionID,
        cand.partyID
      );
      await candidateElectionRepo.add(candidate);
    });
    return {
      success: true,
      message: `Added Successfully`,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.data[Object.keys(err.data)[0]].reason,
    };
  }
};

exports.deleteAssignedCandidates = async (details, electionId) => {
  try {
    await Bluebird.each(details.candidates, async candidate => {
      await candidateElectionRepo.delete({
        candidateID: candidate,
        electionID: electionId,
      });
    });
    return {
      success: true,
      message: `Updated Successfully`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.generateWinner = async electionID => {
  try {
    let allRegionWiseCandidates = await candidateElectionRepo.getAll(
      { exclude: [] },
      { electionID }
    );
    await Bluebird.each(allRegionWiseCandidates, async region => {
      let votes = await smartContract.getRegionWiseCandidateVotes(
        region.candidateID,
        electionID,
        region.regionID
      );
      await candidateElectionRepo.update(
        { votes },
        {
          electionID,
          candidateID: region.candidateID,
          regionID: region.regionID,
        }
      );
    });
    return {
      success: true,
      message: 'Votes Generated Successfully',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getRegionWiseVotes = async electionID => {
  try {
    let votes = await candidateElectionRepo.getRegionWiseVotes(electionID);
    votes.forEach(element => {
      element.candidates = element.candidates
        ? JSON.parse(element.candidates)
        : [];
    });
    let election = await electionRepo.get(['winner', 'isTie'], {
      id: electionID,
    });
    election.winner = election.winner
      ? String(election.winner).split(',')
      : null;
    let winners = {};
    winners.winners = null;
    if (election.winner) {
      winners = await electionRepo.getWinnerNames(election.winner, electionID);
      winners.winners = JSON.parse(winners.winners);
    }
    console;
    return {
      success: true,
      votes,
      isTie: election.isTie,
      winners: winners.winners || null,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.generateGlobalWinner = async electionID => {
  try {
    let parties = await candidateElectionRepo.getPartiesElection(electionID);
    parties.partyIDs = parties.partyIDs ? JSON.parse(parties.partyIDs) : [];
    partyVotes = [];
    let set = new Set(parties.partyIDs);
    parties.partyIDs = Array.from(set);
    await Bluebird.each(parties.partyIDs, async party => {
      let votes = await smartContract.getGlobalWinners(party, electionID);
      partyVotes.push({ id: party, votes });
    });

    partyVotes.sort((a, b) => {
      return b.votes - a.votes;
    });
    let temp = [];
    let highestVotes = Number(partyVotes.length > 0 ? partyVotes[0].votes : 0);
    await Bluebird.each(partyVotes, async party => {
      if (party.votes == highestVotes) {
        temp.push(party.id);
      }
    });
    let winner = temp.join();
    let isTie = winner.length == 1 ? 0 : 1;
    await electionRepo.update({ winner, isTie }, { id: electionID });
    return {
      success: true,
      message: 'Winner generated successfully',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getPartyWiseResults = async electionID => {
  try {
    let parties = await candidateElectionRepo.getPartiesElection(electionID);
    parties.partyIDs = parties.partyIDs ? JSON.parse(parties.partyIDs) : [];
    partyVotes = [];
    let set = new Set(parties.partyIDs);
    parties.partyIDs = Array.from(set);
    await Bluebird.each(parties.partyIDs, async party => {
      let votes = await smartContract.getGlobalWinners(party, electionID);
      let selectedParty = await partyRepo.get({ exclude: [] }, { id: party });
      partyVotes.push({
        id: party,
        votes,
        name: selectedParty.name,
        president: selectedParty.president,
      });
    });

    partyVotes.sort((a, b) => {
      return b.votes - a.votes;
    });
    return {
      success: true,
      parties: partyVotes,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
