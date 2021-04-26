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

exports.getAllElections = async () => {
  try {
    let elections = await electionRepo.getAll({ exclude: [] });
    await Bluebird.each(elections, async element => {
      element.active = moment().isBetween(
        moment(element.startDate),
        moment(element.endDate)
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
        console.log(regions);
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
    await smartContract.addElection(election.id);
    return {
      success: true,
      message: `Election Created Successfully`,
      election,
    };
  } catch (err) {
    console.log(err);
    throw err;
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
      let isCandidateExists = await candidateElectionRepo.get(
        { exclude: [] },
        { candidateID: candidate.candidateID, electionID: electionID }
      );
      if (!isCandidateExists) {
        await smartContract.addParty(cand.partyID, electionID);
        await smartContract.addCandidateElection(
          candidate.candidateID,
          electionID,
          candidate.regionID,
          cand.partyID
        );
        await candidateElectionRepo.add(candidate);
      }
    });
    return {
      success: true,
      message: `Added Successfully`,
    };
  } catch (err) {
    console.log(err);
    throw err;
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
