var DB = require("../db/database"),
  db_sequelize = DB.Sequelize,
  regionElectionWinner = DB.define(
    "RegionElectionWinner",
    {
      electionID: {
        type: db_sequelize.INTEGER,
      },
      candidateID: {
        type: db_sequelize.INTEGER,
      },
      regionID: {
        type: db_sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = regionElectionWinner;
