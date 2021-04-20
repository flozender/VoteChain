const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const regionRepo = require('../models/regionRepo.js');

exports.getAllRegions = async (stateId) => {
  try {
    let regions = await regionRepo.getAll({ exclude: [] }, stateId ? { stateId } : {});
    return {
      success: true,
      regions,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getAllRegionsFromState = async (stateId) => {
  try {
    let regions = await regionRepo.getAllFromState(stateId);
    return {
      success: true,
      regions,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.createRegion = async data => {
  try {
    let region = await regionRepo.add(data);
    return {
      success: true,
      message: `region Created Successfully`,
      region,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getRegion = async regionId => {
  try {
    let region = await regionRepo.get(
      { exclude: [] },
      { id: regionId }
    );
    return {
      success: true,
      region,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};