const fs = require("fs");
const pg = require("pg");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  ssl: {
    ca: fs.readFileSync('config/cc-ca.crt').toString(),
  },
};

var db = new pg.Pool(config);
module.exports = db;
