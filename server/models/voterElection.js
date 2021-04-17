var DB = require("../db/database"),
  db_sequelize = DB.Sequelize,
  voterElection = DB.define(
    "VoterElection",
    {
      electionID: {
        type: db_sequelize.INTEGER,
      },
      voterID: {
        type: db_sequelize.INTEGER,
      },
      candidateID: {
        type: db_sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = voterElection;
