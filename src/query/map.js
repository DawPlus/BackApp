const LIST = `
    SELECT file_id
        , original_name
        , mimetype
        , destination
        , file_name
        , path
        , size
        , team_id
        , url
        , save_date
        , 1 as width
        , 1 as height
    FROM FILE
`;

const SELECT= `
    SELECT file_id
        , original_name
        , mimetype
        , destination
        , file_name
        , path
        , size
        , team_id
        , url
        , save_date
    FROM FILE
    WHERE file_id = ?
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
    , type
    )VALUES(
        ?
    ,?
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

const DELETE = `
DELETE FROM FILE
        WHERE FILE_ID = ?
`;
const DELETE_SUB = `
DELETE FROM FILE_SUB
    WHERE FILE_ID = ?
`
module.exports={
    LIST,
    NEW,
    SUB,
    DELETE,
    DELETE_SUB,
    SELECT
    
}