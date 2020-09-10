const SELECT_ADMIN = `
    SELECT admin_id
         , password
         , update_date
      FROM ADMIN_USER
     WHERE admin_id = ?
       AND password = ?

`;

const UPDATE_PASSWORD = `
        UPDATE ADMIN_USER
           SET password      = ?
             , updateDate    = now()
         WHERE admin_id      = ? 
`;


module.exports={
    SELECT_ADMIN,
    UPDATE_PASSWORD
}