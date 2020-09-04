const LIST = `
SELECT question_id
     , title
     , content
     , type
     , map
     , guide
     , video
     , DATE_FORMAT(update_date, "%Y-%m-%d %T") as update_date
  FROM QUESTION
`;

const EXAMPLE_LIST = `
    SELECT T2.example_id 
        , T2.question_id 
        , T2.content 
        , T2.isAnswer 
        , T2.update_date 
    FROM QUESTION AS T1
    INNER JOIN EXAMPLE  AS T2
    ON T2.question_id  = T1.question_id 
`;



const SELECT= `
    SELECT question_id
        , title
        , content
        , type
        , map
        , guide
        , video
        , DATE_FORMAT(update_date, "%Y-%m-%d %T") as update_date
    FROM QUESTION
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
    )VALUES ?
;
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