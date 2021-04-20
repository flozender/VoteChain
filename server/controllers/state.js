const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const state = require('../models/state.js');
const stateRepo = require('../models/stateRepo.js');

exports.getAllStates = async () => {
  try {
    let states = await stateRepo.getAll({ exclude: [] }, {});
    return {
      success: true,
      states,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.createState = async data => {
  try {
    let state = await stateRepo.add(data);
    return {
      success: true,
      message: `state Created Successfully`,
      state,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getState = async stateId => {
  try {
    let state = await stateRepo.get(
      { exclude: [] },
      { id: stateId }
    );
    return {
      success: true,
      state,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};