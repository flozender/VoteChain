var DB = require("../db/database"),
  db_sequelize = DB.Sequelize,
  party = DB.define(
    "Party",
    {
      id: {
        type: db_sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
      location: {
        type: db_sequelize.STRING,
      },
      president: {
        type: db_sequelize.INTEGER,
      },
      imgURL: {
        type: db_sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = party;
