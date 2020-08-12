
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {UPDATE} = require("../../../query/Team");

const updateRouter = (req, res) => {
    const {team, manager, phone, id} = req.body;
    const param = [team, manager, phone, id];
    db( async (connection)=>{
      try{
          const rows = await query(connection, UPDATE, param).catch(err=>{throw err});
          
          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "수정중 오류가 발생 했습니다."
              })
          }
              return res.json({
                  result : true, 
                  message : "정상 수정 되었습니다.",
                  data : rows 
              }); 
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  }





module.exports = updateRouter;