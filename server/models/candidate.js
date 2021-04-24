var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  candidate = DB.define(
    'Candidate',
    {
      id: {
        type: db_sequelize.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
      age: {
        type: db_sequelize.INTEGER,
      },
      gender: {
        type: db_sequelize.STRING,
      },
      assemblyConstituency: {
        type: db_sequelize.STRING,
      },
      education: {
        type: db_sequelize.INTEGER,
      },
      partyID: {
        type: db_sequelize.INTEGER,
      },
      active: {
        type: db_sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = candidate;
