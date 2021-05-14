const dotenv = require('dotenv');

dotenv.config();

const db_connect = {
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT ,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
}

module.exports = db_connect ;