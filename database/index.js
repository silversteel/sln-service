const Pool = require("pg").Pool;
const { dbHost, dbName, dbPort, dbUser, dbPass } = require('../app/config');

const pool = new Pool({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    port: dbPort
});
const db = pool;

module.exports = db;