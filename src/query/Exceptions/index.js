const LIST = `
    SELECT exceptionId
        , title
        , exceptions
        , deviceId
        , DATE_FORMAT(saveDate, "%Y-%m-%d %T")   AS saveDate
    FROM EXCEPTIONS
    ORDER BY saveDate DESC
`;

const SELECT = `
    SELECT exceptionId
         , title
         , exceptions
         , deviceId
         , DATE_FORMAT(saveDate, "%Y-%m-%d %T")   AS saveDate
      FROM EXCEPTIONS
     WHERE exceptionId = ? 
`;


const NEW = `
    INSERT INTO EXCEPTIONS(
           title
         , exceptions
         , deviceid
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
`;



module.exports={
    LIST ,
    NEW,
    SELECT,
    DELETE
    
}