
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {DELETE} = require("../../../query/Team");

const deleteRouter = (req, res) => {
    const {id} = req.params;
    console.log(id);
    
    db( async (connection)=>{
      try{
          const rows = await query(connection, DELETE, [id]).catch(err=>{throw err});
          
          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "삭제중 오류가 발생 했습니다."
              })
          }
              return res.json({
                  result : true, 
                  message : "정상 삭제 되었습니다.",
                  data : rows 
              }); 
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  }

module.exports = deleteRouter;