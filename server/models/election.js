var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  election = DB.define('Election', {
    id: {
      type: db_sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: db_sequelize.STRING
    },
    startDate: {
      type: db_sequelize.STRING
    },
    endDate: {
      type: db_sequelize.STRING
    },
    location: {
      type: db_sequelize.STRING
    },
    active: {
      type: db_sequelize.INTEGER
    },
    winner: {
      type: db_sequelize.INTEGER
    },
    education: {
      type: db_sequelize.INTEGER
    },
    type: {
      type: db_sequelize.INTEGER
    },
    assemblyConstituencies: {
      type: db_sequelize.TEXT
    }
  },
    {
      freezeTableName: true,
      timestamps: false
    });

module.exports = election;
