var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  candidate = DB.define('Candidate', {
    id: {
      type: db_sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: db_sequelize.STRING
    },
    dob: {
      type: db_sequelize.STRING
    },
    gender: {
      type: db_sequelize.STRING
    },
    education: {
      type: db_sequelize.INTEGER
    },
    assemblyConstituency: {
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

module.exports = candidate;
