const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const Bluebird = require('bluebird');
const electionRepo = require('../models/electionRepo.js');
const regionRepo = require('../models/regionRepo.js');
const candidateElectionRepo = require('../models/candidateElectionRepo.js');
const election = require('../models/election.js');

exports.getAllElections = async () => {
  try {
    let elections = await electionRepo.getAll({ exclude: [] });
    await Bluebird.each(elections, async (element) => {
      if (element.assemblyConstituencies != null) {
        element.regions = element.assemblyConstituencies.split(',').map(Number);
        let regions = await electionRepo.
          getAllRegionsForElection(element.id, element.regions);
        console.log(regions)
        element.assemblyConstituencies = JSON.parse(regions.regions);
        delete element.regions;
      }
    })
    return {
      success: true,
      elections
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.createElection = async (data) => {
  try {
    let election = await electionRepo.add(data);
    return {
      success: true,
      message: `Election Created Successfully`,
      election
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.getElection = async (electionId) => {
  try {
    let election = await electionRepo.get({ exclude: [] }, { id: electionId });
    election.regions = election.assemblyConstituencies.split(',').map(Number);
    let regions = await electionRepo.
      getAllRegionsForElection(election.id, election.regions);
    election.assemblyConstituencies = JSON.parse(regions.regions);
    delete election.regions;
    return {
      success: true,
      election
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.updateElection = async (details, electionId) => {
  try {
    await electionRepo.update(details, { id: electionId });
    return {
      success: true,
      message: `Updated Successfully`
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.assignCandidates = async (details, electionId) => {
  try {
    await Bluebird.each(details.candidates, async (candidate) => {
      candidate.electionID = electionId
      await candidateElectionRepo.add(candidate);
    })
    return {
      success: true,
      message: `Updated Successfully`
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.deleteAssignedCandidates = async (details, electionId) => {
  try {
    await Bluebird.each(details.candidates, async (candidate) => {
      await candidateElectionRepo.delete({
        candidateID: candidate,
        electionID: electionId
      });
    })
    return {
      success: true,
      message: `Updated Successfully`
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}