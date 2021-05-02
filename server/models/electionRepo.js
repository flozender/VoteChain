var election = require('./election');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return election
      .create(data, {
        raw: true,
      })
      .then(res => res.dataValues)
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

    return db
      .query(query, {
        replacements: { electionId },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return election
      .findAll({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getWinnerNames: (winners, electionId) => {
    let query = `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', C.name, 'partyID', P.id, 'partyName', P.name, 'president', P.president)) AS winners
    FROM Election E
    LEFT JOIN Candidate C ON C.id IN (:winners)
    LEFT JOIN Party P ON P.id = C.partyID
    WHERE E.id = :electionId`;

    return db
      .query(query, {
        replacements: { winners, electionId },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },

  getAllRegionsForElection: function (electionId, regions) {
    let query = `SELECT JSON_ARRAYAGG(R.name) AS regions
    FROM Election E
    LEFT JOIN Region R
    ON R.id in (:regions)
    WHERE E.id = :electionId`;

    return db
      .query(query, {
        replacements: { electionId, regions },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },
};
