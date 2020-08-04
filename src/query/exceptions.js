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

module.exports={
    LIST ,
    DELETE
    
}