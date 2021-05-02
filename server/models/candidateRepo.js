var candidate = require('./candidate');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return candidate
      .create(data, {
        raw: true,
      })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return candidate
      .update(update_object, {
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return candidate
      .destroy({
        where: condition,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return candidate
      .findOne({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return candidate
      .findAll({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAllCandidatesWithParty: () => {
    let query = `SELECT C.*, P.name AS partyName FROM Candidate C
    LEFT JOIN Party P ON P.id = C.partyID`;

    return db
      .query(query, {
        replacements: {},
        type: db.QueryTypes.SELECT,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },
};
