const db = require('../db/database.js');
const moment = require('moment');
const Bluebird = require('bluebird');
const utils = require('../helpers/utils');
const voterRepo = require('../models/voterRepo.js');
const electionRepo = require('../models/electionRepo.js');
const candidateElectionRepo = require('../models/candidateElectionRepo.js');
const smartContract = require('../blockchain/Methods.js');

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
      regionID: data.assemblyConstituency,
      type: 'voter',
    });
  } else {
    return {
      success: false,
      message: `OTP Not Verified, Resend OTP and Try Again`,
    };
  }
};

exports.profile = async voterId => {
  try {
    let profile = await voterRepo.getProfile(voterId);
    delete profile.otp;
    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.log(error);
    throw err;
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

exports.getEligibleElections = async voterId => {
  try {
    let voter = await voterRepo.getAssemblyConstituency(voterId);
    let allElections = await electionRepo.getAll({ exclude: [] }, {});
    let elections = [];
    await Bluebird.each(allElections, async element => {
      element.active = moment().isBetween(
        moment(element.startDate),
        moment(element.endDate)
      )
        ? 1
        : 0;
      element.candidates = await candidateElectionRepo.getAssignedCandidatesElectionFromVoter(
        element.id,
        voterId
      );
      element.candidates.forEach(candidate => {
        candidate.candidate = candidate.candidate
          ? JSON.parse(candidate.candidate)
          : null;
        candidate.region = candidate.region
          ? JSON.parse(candidate.region)
          : null;
      });
      element.regions = element.assemblyConstituencies
        ? element.assemblyConstituencies.split(',').map(Number)
        : null;
      if (
        (!element.assemblyConstituencies ||
          element.regions.includes(voter.assemblyConstituency)) &&
        element.candidates &&
        element.candidates.length
      ) {
        elections.push(element);
      }
      delete element.regions;
    });
    return {
      success: true,
      elections,
      region: voter.regionName,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.vote = async details => {
  try {
    let checkCandidate = await candidateElectionRepo.get(
      { exclude: [] },
      {
        candidateID: details.candidateID,
        electionID: details.electionID,
        regionID: details.regionID,
      }
    );
    let res = {};
    if (!checkCandidate) {
      res = {
        success: false,
        message: 'Candidate does not exists',
      };
    } else {
      await smartContract.vote(
        details.id,
        details.electionID,
        details.regionID,
        details.candidateID
      );
      res = {
        success: true,
        message: 'Voted Successfully',
      };
    }
    return res;
  } catch (error) {
    console.log(error);
    throw error;
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
