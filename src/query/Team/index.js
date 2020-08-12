const LIST = `
    SELECT id
        , team
        , manager
        , phone
        , update_date
        , save_date
    FROM TEAM
`;

const SELECT = `
    SELECT id
        , team
        , manager
        , phone
        , update_date
        , save_date
    FROM TEAM
    WHERE id= ?
`
const NEW = `
    INSERT INTO TEAM(
          team
        , manager
        , phone
    )VALUES(
            ?
        ,   ?
        ,   ?
    )
`;

const DELETE = `
    DELETE 
    FROM TEAM
    WHERE id = ?
`;

const UPDATE = `
    UPDATE TEAM
       SET team     = ?
         , manager  = ?
         , phone    = ?   
         , update_date = now()
     WHERE id       = ?

`;

module.exports={
    LIST ,
    NEW,
    DELETE,
    SELECT,
    UPDATE
}