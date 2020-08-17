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

const SELECT= `
SELECT API_ID
     , NAME
     , URL
     , DESCRIPTION
     , method
  FROM API
 WHERE API_ID=?
`;

const DELETE = `
DELETE 
  FROM API
 WHERE API_ID = ?
`;

module.exports={
    LIST ,
    NEW,
    DELETE,
    SELECT
    
}