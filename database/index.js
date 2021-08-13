const Pool = require("pg").Pool;
const { dbHost, dbName, dbPort, dbUser, dbPass, dbUrl } = require('../app/config');

// const pool = new Pool({
//     host: dbHost,
//     user: dbUser,
//     password: dbPass,
//     database: dbName,
//     port: dbPort
// });

const pool = new Pool({
    connectionString: dbUrl,
    ssl: {
        rejectUnauthorized: false
    }
});

const db = pool;

module.exports = db;