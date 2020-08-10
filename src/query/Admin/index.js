const SELECT_ADMIN = `
    SELECT admin_id
         , password
         , update_date
      FROM ADMIN_USER
     WHERE admin_id = ?
       AND password = ?

`;

module.exports={
    SELECT_ADMIN
    
}