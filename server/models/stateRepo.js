var state = require('./state');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return state.create(data, {
      raw: true
    })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return state.update(update_object, {
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return state
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
    return state.destroy({
      where: condition
    })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return state.findOne({
      attributes,
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  }
}
