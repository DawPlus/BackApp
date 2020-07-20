const LIST = `
SELECT QUESTION_ID
     , TITLE
     , CONTENT
     , ISSUBJECTIVE
     , UPDATE_USER
     , UPDATE_DATE
  FROM QUESTION
 ORDER BY UPDATE_DATE DESC 
`;

const ONE = `
SELECT QUESTION_ID
     , TITLE
     , CONTENT
     , ISSUBJECTIVE
     , UPDATE_USER
     , UPDATE_DATE
  FROM QUESTION
 WHERE QUESTION_ID = ?
 ORDER BY UPDATE_DATE DESC

`;

const ADD =  `
INSERT INTO QUESTION(
       TITLE
     , CONTENT
     , UPDATE_USER
     , UPDATE_DATE 
)VALUES(
        ?
      , ?
      , ?
      , NOW()
      )
`;


module.exports={
    LIST ,
    ONE ,
    ADD
}