const LIST = `
    SELECT exception_id
        , title
        , exceptions
        , device_id
        , save_date
    FROM EXCEPTIONS
`;

const DELETE = `
    DELETE 
    FROM API
    WHERE API_ID = ?
`;
const NEW = `
    INSERT INTO FILE(
          original_name
        , mimetype
        , destination
        , file_name
        , path
        , size
        , team_id  
        , url
    )VALUES(
          ?
         ,?
         ,?
         ,?
         ,?
         ,?
         ,?
         ,?
    )

`;

const SUB = `
INSERT INTO FILE_SUB(
    file_id
  , url
)VALUES(
    ?
   ,?
)

`
module.exports={
    NEW
    ,SUB
}