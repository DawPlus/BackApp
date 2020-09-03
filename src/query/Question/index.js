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
         , update_date
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



const SUB = `
    INSERT INTO EXAMPLE(
           question_id
         , content
         , isAnswer
         , update_date
    )VALUES ?

`;

const DELETE = `
DELETE FROM ADMIN_FILE
        WHERE FILE_ID = ?
`;

module.exports={
    LIST,
    NEW,
    SUB,
    DELETE,
    SELECT
    
}