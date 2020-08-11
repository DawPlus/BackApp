const LIST = `
SELECT API_ID
     , NAME
     , URL
     , DESCRIPTION
     , method
  FROM API
`;

const NEW = `
INSERT INTO API(
      NAME
    , URL
    , DESCRIPTION
    , method
)VALUES(
        ?
    ,   ?
    ,   ?
    ,   ?

)
`;

const DELETE = `
DELETE 
  FROM API
 WHERE API_ID = ?
`;

module.exports={
    LIST ,
    NEW,
    DELETE
    
}