
const query = require('../util/query');
const db = require('../util/db_con');


// 삭제 Action
const deleteAction = (res, qr ,params) => {
    db( async (connection)=>{
      try{
          const rows = await query(connection, qr, params).catch(err=>{throw err});
          
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


  // 상세조회
  const selectAction = (res, qr, params) => {
    db( async (connection)=>{
      try{
          const rows = await query(connection, qr, params).catch(err=>{throw err});
          
          if(rows[0] === undefined){
              return res.status(500).json({
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


  // 목록조회
  const listAction = (res, listQuery) => {
    db( async (connection)=>{
      try{
          const rows = await query(connection, listQuery).catch(err=>{throw err});
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


// 신규등록 
  const newAction = (res, qr, params) => {

    db( async (connection)=>{
      try{
          const rows = await query(connection, qr, params)
                            .catch(err=> {throw err;});
          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "오류가 발생했습니다."
              })
          }
              return res.json({
                  result : true, 
                  message : "정상등록되었습니다. ",
                  data : {
                        id: rows.insertId
                    }
              }); 
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  }


  // Update
  const updateAction = (res, qr, params) => {
    db( async (connection)=>{
      try{
          const rows = await query(connection, qr, params).catch(err=>{throw err});
          if(rows === undefined){
              return res.json({
                  result : false ,
                  message : "수정중 오류가 발생 했습니다."
              });
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


  module.exports={
      selectAction,
      deleteAction,
      newAction,
      listAction,
      updateAction

  }