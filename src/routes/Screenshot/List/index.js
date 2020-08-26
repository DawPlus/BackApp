const db    = require('../../../util/db_con');
const query = require('../../../util/query');


module.exports={
 
  // 목록조회
   listAction : (res, qr, params) => {
    db( async (connection)=>{
      try{
          const rows = await query(connection, qr, params).catch(err=>{throw err});
          // 조회결과가 없을경우 
          if(rows.length === 0 || rows[0] === undefined){
               return res.json({
                result : true ,
                message : "조회결과가 없습니다. ",
                data : []
            });
           }
           // 정상조회 
              return res.json({
                  result : true, 
                  message : "정상 조회 되었습니다.",
                  data : rows
              }); 
              
          }catch(err){
              // 오류 발생 
              return res.status(500).json(err)
          }   
      });
  }
};