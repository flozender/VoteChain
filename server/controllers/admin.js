const db = require('../db/database.js');
const utils = require('../helpers/utils.js');
const adminRepo = require('../models/adminRepo.js');
const voterRepo = require('../models/voterRepo.js');

exports.verifyAndAuthorize = async (data) => {
  try {
    let admin = await adminRepo.get({ exclude: [] }, { username: data.username, password: data.password })
    if (admin && admin.id) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      await adminRepo.update({ otp }, { username: data.username, password: data.password });
      let mail = await utils.sendEmailWithOTP(
        admin.name,
        admin.email,
        otp
      );
      if (mail.accepted[0] == admin.email) {
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
  try {
    let admin = await adminRepo.get({ exclude: [] }, { username: data.username, password: data.password, otp: data.otp })
    await adminRepo.update({ otp: null }, { username: data.username, password: data.password });
    if (admin && admin.id) {
      return utils.addToken({
        username: admin.username, adminId: admin.id, name: admin.name, mobile: admin.mobile,
        email: admin.email, type: `admin`
      });
    } else {
      return {
        success: false,
        message: `OTP Not Verified, Resend OTP and Try Again`
      }
    }

  } catch (error) {
    console.log(err);
    throw err;
  }
}
