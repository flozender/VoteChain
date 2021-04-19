var election = require('./election');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return election
      .create(data, {
        raw: true,
      })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return election
      .update(update_object, {
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return election
      .destroy({
        where: condition,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return election
      .findOne({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getElection: function (electionId) {
    let query = `SELECT E.*,
    (SELECT JSON_ARRAYAGG(R.name) FROM Region R WHERE R.id IN (TRIM(BOTH '"' FROM E.assemblyConstituencies))) AS assemblyConstituencies
    FROM Election E
    WHERE E.id = :electionId`;

    return db.query(query, { replacements: { electionId }, type: db.QueryTypes.SELECT })
      .then(data => data[0])
      .catch(error => {
        throw error;
      })
  },

  getAll: function (attributes, condition) {
    return election
      .findAll({
        attributes,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAllElections: function () {
    let query = `SELECT E.*,
    (SELECT JSON_ARRAYAGG(R.name) FROM Region R WHERE R.id IN (TRIM(BOTH '"' FROM E.assemblyConstituencies))) AS assemblyConstituencies
    FROM Election E`;

    return db.query(query, { replacements: {}, type: db.QueryTypes.SELECT })
      .then(data => data)
      .catch(error => {
        throw error;
      })
  }
};
