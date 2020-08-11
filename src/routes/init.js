
const express = require("express");
const router = express.Router();
const query = require('../util/query');
const db = require('../util/db_con');
const {LIST, NEW, DELETE  } = require("../query/API");


// API 목록 조회 조회 
router.post('/', (req, res) => {
  db( async (connection)=>{
    try{
        const rows = await query(connection, LIST).catch(err=>{throw err});
        
        if(rows[0] === undefined){
            return res.json({})
        }
        
            return res.json({
                message : "정상 조회 되었습니다.",
                list : rows
            }); 
        }catch(err){
            return res.status(500).json(err)
        }   
    });
});


// API  신규등록
router.post('/new', (req, res) => {
    const {name, url, description, method} = req.body;
    db( async (connection)=>{
      try{
          const rows = await query(connection, NEW,[name, url, description, method]).catch(err=>{throw err});
          return res.json({
                    message :"정상 등록되었습니다.",
                    info : rows
                
                })
         
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  });
  
  
  
// API 삭제
router.delete('/:id', (req, res) => {
    
    //const {id} = req.body;

    const {id} = req.params;
    console.log(id, "<=====");
    db( async (connection)=>{
      try{
          const rows = await query(connection, DELETE,[id]).catch(err=>{throw err});
          return res.json({
                message : "정상처리 되었습니다.",
                info : rows
        
            })
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  });
  
  

module.exports = router;