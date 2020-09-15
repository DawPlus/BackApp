const LIST = `
    SELECT file_id
        , original_name
        , mimetype
        , destination
        , file_name
        , path
        , size      
        , url
        , teamId
        , save_date
    FROM SCREENSHOT
   WHERE teamId= ?
`;

const NEW = `
    INSERT INTO SCREENSHOT(
           original_name
         , mimetype
         , destination
         , file_name
         , path
         , size
         , url
         , teamId
    )VALUES(
           ?
         , ?
         , ?
         , ?
         , ?
         , ?
         , ?
         , ?
    )

`;

const DELETE = `
DELETE FROM SCREENSHOT
        WHERE FILE_ID = ?;
`;

module.exports={
    LIST,
    NEW,
    DELETE,
    
    
}