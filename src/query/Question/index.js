const LIST = `
SELECT question_id
     , title
     , content
     , type
     , map
     , guide
     , video
     , DATE_FORMAT(update_date, "%Y-%m-%d %T") as update_date
     , useYN
     , hint
  FROM QUESTION
  WHERE useYN = 'Y'
  
`;

const ADMIN_LIST = `
SELECT question_id
     , title
     , content
     , type
     , map
     , guide
     , video
     , DATE_FORMAT(update_date, "%Y-%m-%d %T") as update_date
     , useYN
     , hint
  FROM QUESTION
`;

const EXAMPLE_LIST = `
    SELECT T2.example_id 
        , T2.question_id 
        , T2.content 
        , T2.isAnswer 
        , DATE_FORMAT(T2.update_date, "%Y-%m-%d %T") as update_date
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
        , hint
    FROM QUESTION
    WHERE question_id= ?
`;




const EXAMPLE_SELECT= `
SELECT T2.example_id 
     , T2.question_id 
     , T2.content 
     , T2.isAnswer 
     , DATE_FORMAT(T2.update_date, "%Y-%m-%d %T") AS update_date
  FROM QUESTION      AS T1
 INNER JOIN EXAMPLE  AS T2
    ON T2.question_id  = T1.question_id   
 WHERE T1.question_id  = ?
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
         , hint
    )VALUES(
           ?
         , ?
         , ?
         , ?
         , ?
         , ?
         , sysdate()
         , ?
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
DELETE 
  FROM QUESTION 
 WHERE question_id  =  ?
`;



const USEYN_UPDATE = `
    UPDATE QUESTION
    SET useYN = ?
    WHERE question_id =?
`;





module.exports={
    LIST,
    NEW,
    SUB,
    DELETE,
    SELECT,
    EXAMPLE_LIST,
    EXAMPLE_SELECT,
    ADMIN_LIST,
    USEYN_UPDATE
    
    
}