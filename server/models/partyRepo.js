var party = require('./party');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return party
      .create(data, {
        raw: true,
      })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return party
      .findAll({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return party
      .update(update_object, {
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return party
      .destroy({
        where: condition,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return party
      .findOne({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getDetails: partyId => {
    let query = `SELECT P.*, C.name AS president
    FROM Party P
    LEFT JOIN Candidate C ON P.president = C.id
    WHERE P.id = :partyId`;

    return db
      .query(query, {
        replacements: { partyId },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },
};
