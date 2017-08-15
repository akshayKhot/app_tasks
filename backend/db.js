var pgp = require('pg-promise')(),
    env = require('dotenv').config();

// Database Connection
var cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}
var db = pgp(cn);

module.exports = db;