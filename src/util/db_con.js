const mysql   = require('mysql');
const logger  = require('./logger');


const pool = mysql.createPool({
  host            :  "db.foresthealing113.gabia.io",
  user            :  "foresthealing113",
  port            :  "3306",
  password        :  "forest113*",
  database        :  "dbforesthealing113",
  connectionLimit :  "10",
  multipleStatements: true
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