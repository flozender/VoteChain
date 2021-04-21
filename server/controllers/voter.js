const db = require('../db/database.js');
const utils = require('../helpers/utils');
const voterRepo = require('../models/voterRepo.js');

exports.createVoter = async data => {
  try {
    let voter = await voterRepo.checkVoterExists(
      data.email || null,
      data.mobile,
      data.id
    );
    if (voter && voter.id) {
      return {
        success: false,
        message: `User Already exists`,
      };
    } else {
      data.id = data.id;
      let createVoter = await voterRepo.add(data);
      return {
        success: true,
        message: 'Created Voter Successsfully',
        voter: createVoter,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
exports.verifyVoterAndSendOTP = async data => {
  try {
    let voter = await voterRepo.get(
      { exclude: [] },
      { id: data.id, dob: data.dob }
    );
    if (voter && voter.id) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      await voterRepo.update({ otp }, { id: data.id, dob: data.dob });
      let mail = await utils.sendEmailWithOTP(voter.name, voter.email, otp);
      if (mail.accepted[0] == voter.email) {
        return {
          success: true,
          message: 'OTP sent Successsfully',
        };
      }
    } else {
      return {
        success: false,
        message: `Not Authorized`,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.verifyOTP = async data => {
  let voter = await voterRepo.get(
    { exclude: [] },
    {
      id: data.id,
      dob: data.dob,
      otp: data.otp,
    }
  );
  await voterRepo.update({ otp: null }, { id: data.id, dob: data.dob });
  if (voter && voter.id) {
    return utils.addToken({
      id: voter.id,
      name: voter.name,
      mobile: voter.mobile,
      email: data.email,
      type: 'voter',
    });
  } else {
    return {
      success: false,
      message: `OTP Not Verified, Resend OTP and Try Again`,
    };
  }
};

exports.getAllVoters = async () => {
  try {
    let voters = await voterRepo.getAllVoters();
    return {
      success: true,
      voters,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getVoter = async id => {
  try {
    let voter = await voterRepo.getVoter(id);
    return {
      success: true,
      voter,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getEligibleElections = async id => {
  try {
    let elections = await voterRepo.getAllEligibleElections(id);
    return {
      success: true,
      elections,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateVoter = async (details, id) => {
  try {
    let voter = await voterRepo.update(details, { id: id });
    return {
      success: true,
      message: `Updated Successfully`,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
