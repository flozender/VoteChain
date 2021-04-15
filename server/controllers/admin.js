const db = require('../db/database.js');
const util = require('../helpers/utils.js');
const adminRepo = require('../models/adminRepo.js');
const voterRepo = require('../models/voterRepo.js');

exports.verifyAndAuthorize = async (data) => {
  try {
    let admin = await adminRepo.get({ exclude: [] }, { username: data.username, password: data.password })
    if (admin && admin.id) {
      return util.addToken({
        username: admin.username, adminId: admin.id, name: admin.name, mobile: admin.mobile,
        email: admin.email, type: `admin`
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
