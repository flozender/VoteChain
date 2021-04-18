const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const candidateRepo = require('../models/candidateRepo.js');

exports.getAllCandidates = async () => {
  try {
    let candidates = await candidateRepo.getAll({ exclude: [] });
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
