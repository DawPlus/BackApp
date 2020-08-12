const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {NEW} = require("../../../query/Team");

const newTeam = (req, res) => {

    const {team, manager, phone} = req.body;
    const params = [team, manager, phone];

    db( async (connection)=>{
      try{
          const rows = await query(connection, NEW, params)
                            .catch(err=> {throw err;});

          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "오류가 발생했습니다."
              })
          }
              return res.json({
                  result : true, 
                  message : "정상등록되었습니다. ",
                  data : rows,
                  id : rows.insertId
              }); 
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  }





module.exports = newTeam;