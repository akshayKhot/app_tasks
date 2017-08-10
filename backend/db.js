var pgp = require('pg-promise')();

// Database Connection
var cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres'
}
var db = pgp(cn);

module.exports = db;