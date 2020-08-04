const mysql   = require('mysql');
const logger  = require('./logger');


const pool = mysql.createPool({
  host            :  "db.dawplus.gabia.io",
  user            :  "dawplus",
  port            :  "3306",
  password        :  "5927ab12!@",
  database        :  "dbdawplus",
  connectionLimit :  "10"
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