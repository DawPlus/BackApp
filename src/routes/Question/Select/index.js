
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {SELECT, EXAMPLE_SELECT} = require("../../../query/Question/");



  // 상세조회
  const selectAction = (req, res) => {
    const {id} =  req.params;
    db( async (connection)=>{
      try{
          const rows = await query(connection, SELECT, [id]).catch(err=>{throw err});
          
          if(rows[0] === undefined){
              return res.status(500).json({
                  result : false ,
                  message : "조회중 오류가 발생 했습니다."
              })
          }
          const questions = rows[0];
            //SUB INSERT 
            db( async (connection)=>{
                try{
                    const examples = await query(connection, EXAMPLE_SELECT,[questions.question_id]).catch(err=>{throw err});      
                    // 객관식
                    if(questions.type === "1"){
                        questions.examples = examples;
                    }else{  // 주관식 
                        questions.singleExample= examples[0];
                    }
                         // 정상조회 
                        return res.json({
                            result : true, 
                            message : "정상 조회 되었습니다.",
                            data : questions
                        }); 

                    }catch(err){
                        console.log(err);
                    return res.status(500).json(err)
                    }   
                });

          }catch(err){
              return res.status(500).json(err)
          }   
      });
  }
  module.exports={
     
    selectAction,
     

  }