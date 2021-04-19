const db = require("../db/database.js");
const utils = require('../helpers/utils');
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
      return {
        success: true,
        message: 'Created Voter Successsfully',
        voter: createVoter
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
exports.verifyVoterAndSendOTP = async (data) => {
  try {
    let voter = await voterRepo.get({ exclude: [] }, { id: data.voterId, dob: data.dob })
    if (voter && voter.id) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      await voterRepo.update({ otp }, { id: data.voterId, dob: data.dob });
      let mail = await utils.sendEmailWithOTP(
        voter.name,
        voter.email,
        otp
      );
      if (mail.accepted[0] == voter.email) {
        return {
          success: true,
          message: 'OTP sent Successsfully'
        }
      }

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

exports.verifyOTP = async (data) => {
  let voter = await voterRepo.get({ exclude: [] }, {
    id: data.voterId, dob: data.dob,
    otp: data.otp
  });
  await voterRepo.update({ otp: null }, { id: data.voterId, dob: data.dob });
  if (voter && voter.id) {
    return utils.addToken({
      voterId: voter.id, name: voter.name, mobile: voter.mobile,
      email: data.email, type: "voter"
    });
  } else {
    return {
      success: false,
      message: `OTP Not Verified, Resend OTP and Try Again`
    }
  }
}

exports.getAllVoters = async () => {
  try {
    let voters = await voterRepo.getAllVoters();
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
    let voter = await voterRepo.getVoter(voterId);
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
    let elections = await voterRepo.getAllEligibleElections(voterId)
    return {
      success: true,
      elections
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
