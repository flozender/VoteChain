var election = require('./election');
let db = require('../db/database');


module.exports = {
  add: function (data) {
    return election.create(data, {
      raw: true
    })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return election.update(update_object, {
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return election.destroy({
      where: condition
    })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return election.findOne({
      attributes,
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

}
