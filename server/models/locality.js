var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  locality = DB.define(
    'Locality',
    {
      id: {
        type: db_sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
      stateID: {
        type: db_sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = locality;
