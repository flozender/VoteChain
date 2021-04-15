var admin = require('./admin');
let db = require('../db/database');

module.exports = {
  add: function (data) {
    return admin.create(data, {
      raw: true
    })
      .then(res => res)
      .catch(error => {
        throw error;
      });
  },

  update: function (update_object, condition) {
    return admin.update(update_object, {
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  delete: function (condition) {
    return admin.destroy({
      where: condition
    })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  get: function (attributes, condition) {
    return admin.findOne({
      attributes,
      where: condition
    })
      .then(data => data)
      .error(error => {
        throw error;
      });
  },

  // checkAdminExists: function (email, mobile, adminId) {
  //   let condition = email && mobile ?
  //     [{ email: email }, { mobile: mobile }]
  //     : email ? [{ email: email }]
  //       : mobile ? [{ mobile: mobile }]
  //         : [{ id: adminId }]

  //   return admin.findOne({
  //     attributes: ['email', 'id', 'name', 'dob', 'mobile'],
  //     where: {
  //       $or: condition
  //     },
  //     raw: true
  //   })
  //     .then(data => data)
  //     .catch(error => {
  //       throw error;
  //     })
  // },

  // getAll: function (manager_id, is_admin, space_ids) {
  //   let condition = (!is_admin) ? `WHERE T.space_id in (:space_ids)` : ``;
  //   let query = `SELECT T.id, T.name, T.price, T.is_active,
  //    T.capacity, T.space_id,
  //    CONCAT(T.capacity, ' ', 'Seater Cabin') as name,
  //    CONCAT(REPLACE(S.location_name, ' ', '-'), '-', S.id) as link_name
  //    FROM admin T
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
