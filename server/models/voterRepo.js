var voter = require('./voter');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return voter.create(data, {
      raw: true
    })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return voter.update(update_object, {
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return voter.destroy({
      where: condition
    })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return voter.findOne({
      attributes,
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  getAll: function (attributes, condition) {
    return voter.findAll({
      attributes
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  checkVoterExists: function (email, mobile, voterId) {
    let condition = email && mobile ?
      [{ email: email }, { mobile: mobile }]
      : email ? [{ email: email }]
        : mobile ? [{ mobile: mobile }]
          : [{ id: voterId }]

    return voter.findOne({
      attributes: ['email', 'id', 'name', 'dob', 'mobile'],
      where: {
        $or: condition
      },
      raw: true
    })
      .then(data => data)
      .catch(error => {
        throw error;
      })
  },

  // getAll: function (manager_id, is_admin, space_ids) {
  //   let condition = (!is_admin) ? `WHERE T.space_id in (:space_ids)` : ``;
  //   let query = `SELECT T.id, T.name, T.price, T.is_active,
  //    T.capacity, T.space_id,
  //    CONCAT(T.capacity, ' ', 'Seater Cabin') as name,
  //    CONCAT(REPLACE(S.location_name, ' ', '-'), '-', S.id) as link_name
  //    FROM voter T
  //    LEFT JOIN
  //    spaces S
  //    ON S.id = T.space_id
  //    ${condition}`;

  //   return db.query(query, { replacements: { space_ids }, type: db.QueryTypes.SELECT })
  //     .then(data => data)
  //     .catch(error => {
  //       throw error;
  //     })
  // }
}
