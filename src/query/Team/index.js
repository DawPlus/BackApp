const LIST = `
    SELECT teamId
        , team
        , manager
        , phone
        , DATE_FORMAT(updateDate, "%Y-%m-%d") AS updateDate
        , DATE_FORMAT(saveDate, "%Y-%m-%d")   AS saveDate
    FROM TEAM
`;

const SELECT = `
    SELECT teamId
        , team
        , manager
        , phone
        , DATE_FORMAT(updateDate, "%Y-%m-%d") AS updateDate
        , DATE_FORMAT(saveDate, "%Y-%m-%d")   AS saveDate
    FROM TEAM
    WHERE teamId= ?
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
    WHERE teamId = ?
`;

const UPDATE = `
    UPDATE TEAM
       SET team     = ?
         , manager  = ?
         , phone    = ?   
         , updateDate = now()
     WHERE teamId       = ?

`;

module.exports={
    LIST ,
    NEW,
    DELETE,
    SELECT,
    UPDATE
}