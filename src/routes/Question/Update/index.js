
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const mysql   = require('mysql');
const {USEYN_UPDATE, UPDATE, UPDATE_EXAM} = require("../../../query/Question/");


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

  // 문제 수정
  const updateAction = (req, res) =>{

        const {title, type, content, map , guide, video, hint, question_id, singleExample, examples}  = req.body;
        const nType = type == 1  ? true :false ;  // 1 객관식 , 2 주관식 


        db( async (connection)=>{
        try{
            const rows = await query(connection
                , UPDATE
                , [title, content,  map , guide, video, hint, question_id ]).catch(err=> {throw err;});
            
            if(rows === undefined){
                return res.json({
                    result : false ,
                    message : "오류가 발생했습니다."
                })
            }

            // 문제 수정 
            db( async (connection)=>{
                try{
                  var sub = {};
                    if(nType){
                            var querys ="";
                            examples.map(it =>{
                                querys += mysql.format(UPDATE_EXAM, [it.content, it.isAnswer, it.example_id]);
                            })
                            sub = await query(connection, querys).catch(err=>{throw err});                   
                        }else{
                            sub = await query(connection, UPDATE_EXAM, [singleExample.content, 1, singleExample.example_id]).catch(err=>{throw err});                   
                        }
                        
                        return res.json({
                            message : "정상 수정 되었습니다 ",
                            result : true
                        })
                        
                    }catch(err){
                        console.log(err);
                    return res.status(500).json(err)
                    }   
                });    


            }catch(err){
                console.log(err);
                return res.status(500).json(err)
            }   
        });
  }



  // 문제 수정
  const updateExamAction = (req, res) =>{
    const {type, examples, singleExample}  = req.body;
    const nType = type == 1  ? true :false ;  // 1 객관식 , 2 주관식 
   
    db( async (connection)=>{
        try{
          var sub = {};
            if(nType){
                    var querys ="";
                    examples.map(it =>{
                        querys += mysql.format(UPDATE_EXAM, [it.content, it.isAnswer, it.example_id]);
                    })
                    sub = await query(connection, querys).catch(err=>{throw err});                   
                }else{
                    sub = await query(connection, UPDATE_EXAM, [singleExample.content, 1, singleExample.example_id]).catch(err=>{throw err});                   
                }
                    
                console.log(sub);

                return res.json({
                    message : "정상 수정 되었습니다 ",
                    result : true,
                    data : sub
                })
            }catch(err){
                console.log(err);
            return res.status(500).json(err)
            }   
        });
}



  module.exports={
     
      updateUseYNAction,
      updateAction,
      updateExamAction
     

  }