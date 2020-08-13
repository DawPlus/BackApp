const LIST = `
    SELECT exception_id
        , title
        , exceptions
        , device_id
        , save_date
    FROM EXCEPTIONS
`;

const SELECT = `
    SELECT exception_id
         , title
         , exceptions
         , device_id
         , save_date
      FROM EXCEPTIONS
     WHERE exception_id = ? 
`;


const NEW = `
    INSERT INTO EXCEPTIONS(
           title
         , exceptions
         , device_id
    )VALUES(
            ?
          , ?
          , ?
    )
;
`
const DELETE = `
    DELETE 
      FROM EXCEPTIONS
     WHERE exception_id = ?
`;

module.exports={
    LIST ,
    NEW,
    SELECT,
    DELETE
    
}