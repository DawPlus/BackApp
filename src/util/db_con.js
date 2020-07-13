const mysql   = require('mysql');
const logger  = require('./logger');
require('dotenv').config();

const pool = mysql.createPool({
  host            :  process.env.HOST,
  user            :  process.env.DB_USER,
  port            :  process.env.DB_PORT,
  password        :  process.env.DB_PW,
  database        :  process.env.DB_DATABASE,
  connectionLimit :  process.env.DB_CONNCETION_LIMIT
});
logger.info('Connection pool created.');

pool.on('acquire', function (connection) {
  logger.info(`Connection ${connection.threadId} acquired`);
});                                                                                   

pool.on('enqueue', function () {
  logger.info('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  logger.info(`Connection ${connection.threadId} released`);
});

var getConn = async function(callback) {
  pool.getConnection(function(err, connection) {
    if(!err){
      callback(connection);
    }
  });
}

module.exports = getConn;