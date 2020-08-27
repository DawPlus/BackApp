const LIST = `
    SELECT file_id
        , original_name
        , mimetype
        , destination
        , file_name
        , path
        , size      
        , url
        , team_id
        , save_date
    FROM SCREENSHOT
   WHERE team_id = ?
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
         , team_id
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
        WHERE FILE_ID = ?
`;

module.exports={
    LIST,
    NEW,
    DELETE,
    
    
}