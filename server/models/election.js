var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  election = DB.define(
    'Election',
    {
      id: {
        type: db_sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
      startDate: {
        type: db_sequelize.STRING,
      },
      endDate: {
        type: db_sequelize.STRING,
      },
      location: {
        type: db_sequelize.STRING,
      },
      winner: {
        type: db_sequelize.STRING,
      },
      education: {
        type: db_sequelize.INTEGER,
      },
      type: {
        type: db_sequelize.INTEGER,
      },
      isTie: {
        type: db_sequelize.INTEGER,
      },
      stateID: {
        type: db_sequelize.INTEGER,
      },
      assemblyConstituencies: {
        type: db_sequelize.TEXT,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = election;
