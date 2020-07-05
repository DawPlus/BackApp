// connect
const mysql = require('mysql');
const config = require("../config").dbConfig

// 사용하지 않지만 참고용으로 필요함
const connection = mysql.createPool(config);
module.exports = async () => new Promise(
(resolve, reject) => {
  connection.getConnection(error => {
	  if (error) {
      reject(error);
      return;
    }
    resolve(connection);
  })
});