const LIST = `
    SELECT question_id
        , title
        , content
        , type
        , update_date
    FROM QUESTION
 
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
    INSERT INTO QUESTION(
           title
         , content
         , type
         , map
         , guide
         , video
         , updae_date
    )VALUES(
           ?
         , ?
         , ?
         , ?
         , ?
         , ?
         , sysdate()
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