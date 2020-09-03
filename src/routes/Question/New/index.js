
const query = require('../../../util/query');
const db = require('../../../util/db_con');
const {NEW, SUB} = require("../../../query/Question/");


// 신규등록 
  const newAction = (req, res) => {
    const {title, type, content, map , guide, video, examples, singleExample}  = req.body;
    const nType = type ? 1 : 2;  // 1 객관식 , 2 주관식 


    db( async (connection)=>{
      try{
          const rows = await query(connection, NEW, [title, content, type, map , guide, video]).catch(err=> {throw err;});
         
          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "오류가 발생했습니다."
              })
          }

          const value = [
              [1, 11, 12],
              [1, 31, 32],
              [1, 41, 42],
              [1, 51, 52],

          ]


                // SBU INSERT 
                db( async (connection)=>{
                    try{

                            if(type){
                                // examples.map(async (item) =>{
                                //     const {content, isAnswer} = item;
                                //     await query(connection, SUB,[ content, isAnswer]).catch(err=>{throw err});
                                // })
                                await query(connection, SUB,value).catch(err=>{throw err});
                            }else{
                                await query(connection, SUB,[rows.insertId, singleExample, "1"]).catch(err=>{throw err});
                            }

                        }catch(err){
                            console.log(err);
                           return res.status(500).json(err)
                        }   
                    });

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




  module.exports={
     
      newAction,
     

  }