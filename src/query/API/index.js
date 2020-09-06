const LIST = `
SELECT apiId
     , name
     , url
     , description
     , method
  FROM API
`;

const NEW = `
INSERT INTO API(
      name
    , url
    , description
    , method
)VALUES(
        ?
    ,   ?
    ,   ?
    ,   ?

)
`;

const SELECT= `
SELECT apiId
     , name
     , url
     , description
     , method
  FROM API
 WHERE apiId=?
`;

const DELETE = `
DELETE 
  FROM API
 WHERE apiId = ?
`;

module.exports={
    LIST ,
    NEW,
    DELETE,
    SELECT
    
}