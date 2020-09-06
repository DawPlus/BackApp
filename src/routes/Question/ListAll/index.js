
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {LIST, EXAMPLE_LIST} = require("../../../query/Question");


// 신규등록 
 

  // 목록조회
  const listAllAction = (req, res) => {
    db( async (connection)=>{
      try{
          const rows = await query(connection, LIST).catch(err=>{throw err});
          // 조회결과가 없을경우 
          if(rows.length === 0 || rows[0] === undefined){
               return res.json({
                result : true ,
                message : "조회결과가 없습니다. ",
                data : []
            });
           }
          //SUB INSERT 
          db( async (connection)=>{
            try{
                const examples = await query(connection, EXAMPLE_LIST).catch(err=>{throw err});      
                rows.map(it => {
                    it.example =  examples.filter(item => { return item.question_id === it.question_id});                
                });
                      // 정상조회 
                      return res.json({
                        result : true, 
                        message : "정상 조회 되었습니다.",
                        data : rows
                    }); 

                }catch(err){
                    console.log(err);
                  return res.status(500).json(err)
                }   
            });

          }catch(err){
              // 오류 발생 
              return res.status(500).json(err)
          }   
      });
  }





  module.exports={
     
    listAllAction,
     

  }