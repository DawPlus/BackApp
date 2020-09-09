
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {USEYN_UPDATE} = require("../../../query/Question/");


  // 사용여부 수정 
  const updateUseYNAction = (req, res) => {
    const {useYN, question_id}  = req.body;

    // 입력값 체크 
    if(useYN === undefined || question_id === undefined){
        return res.json({
                result : false,
                message : "정보를 모두 입력해 주십시오"
        })
    }



    db( async (connection)=>{
      try{
          const rows = await query(connection
                                 , USEYN_UPDATE
                                 , [useYN, question_id]).catch(err=> {throw err;});
         
            if(rows === undefined){
                return res.json({
                    result : false ,
                    message : "오류가 발생했습니다."
                })
            }
                        

              return res.json({
                  result : true, 
                  message : "사용여부 수정 완료하였습니다. ",
                  data : rows                  
              }); 

          }catch(err){
              console.log(err);
              return res.status(500).json(err)
          }   
      });
  }




  module.exports={
     
      updateUseYNAction,
     

  }