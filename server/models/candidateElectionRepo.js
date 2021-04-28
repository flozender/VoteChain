var candidateElection = require('./candidateElection');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return candidateElection
      .create(data, {
        raw: true,
      })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return candidateElection
      .update(update_object, {
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return candidateElection
      .destroy({
        where: condition,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return candidateElection
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
    return candidateElection
      .findAll({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAssignedCandidatesElectionFromVoter: (electionId, voterId) => {
    let query = `SELECT JSON_OBJECT('id', CE.candidateID, 'name', C.name, 'partyID', C.partyID, 'partyName', P.name, 'partyImgURL', P.imgURL) AS candidate,
      JSON_OBJECT('regionID', CE.regionID) AS region
      FROM CandidateElection CE
      LEFT JOIN Candidate C
      ON C.id = CE.candidateID
      LEFT JOIN Party P
      ON P.id = C.partyID
      LEFT JOIN Voter V
      ON V.id = :voterId
      WHERE CE.regionID = V.assemblyConstituency AND CE.electionID = :electionId
      ORDER BY CE.candidateID ASC, CE.regionID`;

    return db
      .query(query, {
        replacements: { electionId, voterId },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  getAssignedCandidatesElectionForAdmin: electionId => {
    let query = `SELECT JSON_OBJECT('id', CE.id, 'name', C.name, 'partyID', C.partyID, 'partyName', P.name, 'partyImgURL', P.imgURL) AS candidate,
      JSON_OBJECT('regionID', CE.regionID, 'regionName', R.name) AS region
      FROM CandidateElection CE
      LEFT JOIN Candidate C
      ON C.id = CE.candidateID
      LEFT JOIN Region R
      ON R.id = CE.regionID
      LEFT JOIN Party P
      ON P.id = C.partyID
      WHERE CE.electionID = :electionId
      ORDER BY CE.candidateID, CE.regionID`;

    return db
      .query(query, {
        replacements: { electionId },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  getPartiesElection: electionId => {
    let query = `SELECT JSON_ARRAYAGG(C.partyID) AS partyIDs
      FROM CandidateElection CE 
      LEFT JOIN Candidate C ON C.id = CE.candidateID 
      WHERE CE.electionID = :electionId`;

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

  getRegionWiseVotes: electionId => {
    let query = `SELECT DISTINCT CE.electionID, CE.regionID, R.name AS regionName,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('candidateID', X.candidateID, 'votes',
      X.votes, 'name', C.name, 'partyID', C.partyID, 'partyName', P.name)) 
      FROM CandidateElection X
      LEFT JOIN Candidate C ON C.id = X.candidateID
      LEFT JOIN Party P ON P.id = C.partyID
      WHERE X.electionID = :electionId AND X.regionID = CE.regionID
      ORDER BY X.votes DESC) AS candidates
      FROM CandidateElection CE 
      LEFT JOIN Region R ON R.id = CE.regionID 
      WHERE CE.electionID = :electionId ORDER BY CE.regionID `;

    return db
      .query(query, {
        replacements: { electionId },
        type: db.QueryTypes.SELECT,
      })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },
};
