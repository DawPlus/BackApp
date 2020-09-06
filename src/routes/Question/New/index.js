
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {NEW, SUB} = require("../../../query/Question/");


// 신규등록 
  const newAction = (req, res) => {
    const {title, type, content, map , guide, video, hint,examples, singleExample}  = req.body;
    const nType = type == 1  ? true :false ;  // 1 객관식 , 2 주관식 

    db( async (connection)=>{
      try{
          const rows = await query(connection, NEW, [title, content, type, map , guide, video, hint]).catch(err=> {throw err;});
         
          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "오류가 발생했습니다."
              })
          }
                //SUB INSERT 
                db( async (connection)=>{
                    try{
                            const insertExam =  [];

                            if(nType){
                                // 객관식 
                                examples.map(it => insertExam.push([rows.insertId, it.content, it.isAnswer]))
                            }else{
                                // 주관식 
                                insertExam.push([rows.insertId, singleExample, 1]);
                            }

                            const sub = await query(connection, SUB,[insertExam]).catch(err=>{throw err});                   
                        }catch(err){
                            console.log(err);
                           return res.status(500).json(err)
                        }   
                    });

              return res.json({
                  result : true, 
                  message : "정상등록되었습니다. ",
                  data : rows                  
              }); 

          }catch(err){
              console.log(err);
              return res.status(500).json(err)
          }   
      });
  }




  module.exports={
     
      newAction,
     

  }