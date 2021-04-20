var region = require('./region');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return region.create(data, {
      raw: true
    })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return region.update(update_object, {
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return region
      .findAll({
        attributes,
        where: condition,
      })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return region.destroy({
      where: condition
    })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return region.findOne({
      attributes,
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAllFromState: (stateId) => {
    let query = `SELECT R.* FROM Region R
    LEFT JOIN Locality L
    ON L.id = R.localityID
    LEFT JOIN State S
    ON S.id = L.stateID
    WHERE S.id = :stateId`;

    return db.query(query, { replacements: { stateId }, type: db.QueryTypes.SELECT })
      .then(data => data)
      .catch(error => {
        throw error;
      })
  }
}
