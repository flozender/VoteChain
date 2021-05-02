const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const candidate = require('../models/candidate.js');
const candidateRepo = require('../models/candidateRepo.js');
const candidateElectionRepo = require('../models/candidateElectionRepo.js');

exports.getAllCandidates = async () => {
  try {
    let candidates = await candidateRepo.getAllCandidatesWithParty();
    return {
      success: true,
      candidates,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.createCandidate = async data => {
  try {
    let candidate = await candidateRepo.add(data);
    return {
      success: true,
      message: `candidate Created Successfully`,
      candidate,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getAllCandidatesOfParty = async partyID => {
  try {
    let candidates = await candidateRepo.getAll({ exclude: [] }, { partyID });
    return {
      success: true,
      candidates,
    };
  } catch (error) {}
};

exports.getCandidate = async candidateId => {
  try {
    let candidate = await candidateRepo.get(
      { exclude: [] },
      { id: candidateId }
    );
    return {
      success: true,
      candidate,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateCandidate = async (details, candidateId) => {
  try {
    await candidateRepo.update(details, { id: candidateId });
    return {
      success: true,
      message: `Updated Successfully`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deleteCandidate = async candidateId => {
  try {
    await candidateRepo.update({ active: 0 }, { id: candidateId });
    return {
      success: true,
      message: `Updated Successfully`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getAssignedCandidatesElectionFromVoter = async (
  electionId,
  voterId
) => {
  try {
    let candidates = await candidateElectionRepo.getAssignedCandidatesElectionFromVoter(
      electionId,
      voterId
    );
    candidates.forEach(element => {
      element.candidate = element.candidate
        ? JSON.parse(element.candidate)
        : null;
      element.region = element.region ? JSON.parse(element.region) : null;
    });
    return {
      success: true,
      candidates,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getAssignedCandidatesElectionForAdmin = async electionId => {
  try {
    let candidates = await candidateElectionRepo.getAssignedCandidatesElectionForAdmin(
      electionId
    );
    candidates.forEach(element => {
      element.candidate = element.candidate
        ? JSON.parse(element.candidate)
        : null;
      element.region = element.region ? JSON.parse(element.region) : null;
    });
    return {
      success: true,
      candidates,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
