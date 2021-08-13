const dotenv = require('dotenv');
dotenv.config();

module.exports = {
   serviceName: process.env.SERVICE_NAME,
   tokenSecret: process.env.TOKEN_SECRET,
   dbHost: process.env.DB_HOST,
   dbUser: process.env.DB_USER, 
   dbPort: process.env_DB_PORT,
   dbPass: process.env.DB_PASS, 
   dbName: process.env.DB_NAME,
   dbUrl: process.env.DB_URL
}