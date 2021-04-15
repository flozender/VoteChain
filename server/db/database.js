require("dotenv").config();
let Sequelize = require("sequelize"),
  db;

db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: true,
    query: { raw: true },

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },

    timezone: process.env.TIMEZONE,
  }
);

module.exports = db;