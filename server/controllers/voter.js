const db = require("../db/database.js");
const util = require("../helpers/utils.js");
const voterRepo = require("../models/voterRepo.js");

exports.createVoter = async (data) => {
  try {
    data.id = data.voterId;
    let voter = await voterRepo.checkVoterExists(data.email || null, data.mobile, data.voterId);
    if (voter && voter.id) {
      return {
        success: false,
        message: `User Already exists`
      }
    } else {
      data.id = data.voterId;
      let createVoter = await voterRepo.add(data);
      return util.addToken({
        voterId: createVoter.voterId, name: data.name, mobile: data.mobile,
        email: data.email
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
exports.verifyUserAndSendOTP = async (data) => {
  try {
    let voter = await voterRepo.get({ exclude: [] }, { id: data.voterId, dob: data.dob })
    if (voter && voter.id) {
      return util.addToken({
        voterId: voter.id, name: voter.name, mobile: voter.mobile,
        email: data.email, type: "voter"
      });
    } else {
      return {
        success: false,
        message: `Not Authorized`
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.getAllVoters = async () => {
  try {
    let voters = await voterRepo.getAll({ exclude: [] });
    return {
      success: true,
      voters
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.getVoter = async (voterId) => {
  try {
    let voter = await voterRepo.get({ exclude: [] }, { id: voterId });
    return {
      success: true,
      voter
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.getEligibleElections = async (voterId) => {
  try {
    let voter = await voterRepo.get({ exclude: [] }, { id: voterId });
    return {
      success: true,
      voter
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.updateVoter = async (details, voterId) => {
  try {
    let voter = await voterRepo.update(details, { id: voterId });
    return {
      success: true,
      message: `Updated Successfully`
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
