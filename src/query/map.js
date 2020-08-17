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
        , 1 as width
        , 1 as height
    FROM ADMIN_FILE
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
         , 1
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