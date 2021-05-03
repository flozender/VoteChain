var voter = require('./voter');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return voter
      .create(data, {
        raw: true,
      })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return voter
      .update(update_object, {
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return voter
      .destroy({
        where: condition,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return voter
      .findOne({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getProfile: voterId => {
    let query = `SELECT V.*, R.name AS regionName
    FROM Voter V
    LEFT JOIN Region R
    ON R.id = V.assemblyConstituency
    WHERE V.id = :voterId`;

    return db
      .query(query, { replacements: { voterId }, type: db.QueryTypes.SELECT })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },

  getVoter: function (voterId) {
    let query = `SELECT V.*,
    CONCAT(R.name, ', ', L.name, ', ', S.name) AS assemblyConstituency,
    V.assemblyConstituency AS ac,
    R.pincode, S.id AS stateID
    FROM Voter V
    LEFT JOIN Region R
    ON R.id = V.assemblyConstituency
    LEFT JOIN Locality L
    ON L.id = R.localityID
    LEFT JOIN State S
    ON S.id = L.stateID
    WHERE V.id = :voterId`;

    return db
      .query(query, { replacements: { voterId }, type: db.QueryTypes.SELECT })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return voter
      .findAll({
        attributes,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAllVoters: function () {
    let query = `SELECT V.*,
      CONCAT(R.name, ', ', L.name, ', ', S.name) AS assemblyConstituency,      
      R.pincode
      FROM Voter V
      LEFT JOIN Region R
      ON R.id = V.assemblyConstituency
      LEFT JOIN Locality L
      ON L.id = R.localityID
      LEFT JOIN State S
      ON S.id = L.stateID`;

    return db
      .query(query, { replacements: {}, type: db.QueryTypes.SELECT })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  checkVoterExists: function (email, mobile, voterId) {
    let condition =
      email && mobile
        ? [{ email: email }, { mobile: mobile }]
        : email
        ? [{ email: email }]
        : mobile
        ? [{ mobile: mobile }]
        : [{ id: voterId }];

    return voter
      .findOne({
        attributes: ['email', 'id', 'name', 'dob', 'mobile'],
        where: {
          $or: condition,
        },
        raw: true,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  getAllEligibleElections: function (voterId) {
    let query = `SELECT E.* FROM Election E, Voter V WHERE V.id = :voterId AND ((V.assemblyConstituency IN (TRIM(BOTH '"' FROM E.assemblyConstituencies))) OR E.assemblyConstituencies IS NULL)`;

    return db
      .query(query, { replacements: { voterId }, type: db.QueryTypes.SELECT })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  getAssemblyConstituency: function (voterId) {
    let query = `SELECT V.assemblyConstituency, R.name AS regionName, S.id AS stateID
    FROM Voter V
    LEFT JOIN Region R
    ON V.assemblyConstituency = R.id
    LEFT JOIN Locality L
    ON R.localityID = L.id
    LEFT JOIN State S
    ON S.id = L.stateID
    WHERE V.id = :voterId`;

    return db
      .query(query, { replacements: { voterId }, type: db.QueryTypes.SELECT })
      .then(data => data[0])
      .catch(error => {
        throw error;
      });
  },
};
