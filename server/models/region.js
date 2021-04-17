var DB = require("../db/database"),
  db_sequelize = DB.Sequelize,
  region = DB.define(
    "Region",
    {
      id: {
        type: db_sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
      localityID: {
        type: db_sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = region;
