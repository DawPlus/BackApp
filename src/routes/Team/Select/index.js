
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {SELECT} = require("../../../query/Team");

const select = (req, res) => {
    const {id} = req.params;

    db( async (connection)=>{
      try{
          const rows = await query(connection, SELECT,[id]).catch(err=>{throw err});
          
          if(rows[0] === undefined){
              return res.json({
                  result : false ,
                  message : "조회중 오류가 발생 했습니다."
              })
          }
              return res.json({
                  result : true, 
                  message : "정상 조회 되었습니다.",
                  data : rows[0]
              }); 
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  }





module.exports = select;