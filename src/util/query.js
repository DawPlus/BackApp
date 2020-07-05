module.exports = async (conn, q, params) => new Promise(
    (resolve, reject) => {
      const handler = (error, result) => {
        conn.release();
          if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
      conn.query(q, params, handler);
    
      
});