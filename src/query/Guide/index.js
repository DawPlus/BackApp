const LIST = `
    SELECT file_id
        , original_name
        , mimetype
        , destination
        , file_name
        , path
        , size      
        , url
        , save_date
    FROM ADMIN_FILE
   WHERE type='2'
`;

const SELECT= `
    SELECT file_id
        , original_name
        , mimetype
        , destination
        , file_name
        , path
        , size
        , url
        , save_date
    FROM ADMIN_FILE
    WHERE file_id = ?
`;


const NEW = `
    INSERT INTO ADMIN_FILE(
           original_name
         , mimetype
         , destination
         , file_name
         , path
         , size
         , url
         , type
    )VALUES(
           ?
         , ?
         , ?
         , ?
         , ?
         , ?
         , ?
         , 2
    )

`;

const DELETE = `
DELETE FROM ADMIN_FILE
        WHERE FILE_ID = ?
`;

module.exports={
    LIST,
    NEW,
    DELETE,
    SELECT
    
}