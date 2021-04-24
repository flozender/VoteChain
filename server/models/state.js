var DB = require('../db/database'),
  db_sequelize = DB.Sequelize,
  state = DB.define(
    'State',
    {
      id: {
        type: db_sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

module.exports = state;
