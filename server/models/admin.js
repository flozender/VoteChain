var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  admin = DB.define('Admin', {
    id: {
      type: db_sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: db_sequelize.STRING
    },
    password: {
      type: db_sequelize.STRING
    },
    username: {
      type: db_sequelize.STRING
    },
    mobile: {
      type: db_sequelize.STRING
    },
    email: {
      type: db_sequelize.STRING
    }
  },
    {
      freezeTableName: true,
      timestamps: false
    });

module.exports = admin;
