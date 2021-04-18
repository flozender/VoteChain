var DB = require("../db/database"),
  db_sequelize = DB.Sequelize,
  candidateElection = DB.define(
    "CandidateElection",
    {
      candidateID: {
        type: db_sequelize.INTEGER,
      },
      electionID: {
        type: db_sequelize.INTEGER,
      },
      regionID: {
        type: db_sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = candidateElection;
