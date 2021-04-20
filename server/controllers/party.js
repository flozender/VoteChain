const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const party = require('../models/party.js');
const partyRepo = require('../models/partyRepo.js');

exports.getAllParties = async () => {
  try {
    let parties = await partyRepo.getAll({ exclude: [] }, {});
    return {
      success: true,
      parties,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.createParty = async data => {
  try {
    let party = await partyRepo.add(data);
    return {
      success: true,
      message: `Party Created Successfully`,
      party,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getParty = async partyId => {
  try {
    let party = await partyRepo.get(
      { exclude: [] },
      { id: partyId }
    );
    return {
      success: true,
      party,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};