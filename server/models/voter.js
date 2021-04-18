var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  voter = DB.define('Voter', {
    id: {
      type: db_sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: db_sequelize.STRING
    },
    dob: {
      type: db_sequelize.DATE
    },
    gender: {
      type: db_sequelize.STRING
    },
    education: {
      type: db_sequelize.INTEGER
    },
    assemblyConstituency: {
      type: db_sequelize.INTEGER
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

module.exports = voter;
