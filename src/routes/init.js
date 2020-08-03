
const express = require("express");
const router = express.Router();
const query = require('../util/query');
const db = require('../util/db_con');
const {LIST, NEW, DELETE  } = require("../query/init");


// API 목록 조회 조회 
router.post('/', (req, res) => {
  db( async (connection)=>{
    try{
        const rows = await query(connection, LIST).catch(err=>{throw err});
        
        if(rows[0] === undefined){
                return res.json({})
        }
        console.log(rows);
            return res.json({
                list : rows
            }); 
        }catch(err){
            return res.status(500).json(err)
        }   
    });
});


// API  신규등록
router.post('/new', (req, res) => {
    const {name, url, description} = req.body;
    db( async (connection)=>{
      try{
          const rows = await query(connection, NEW,[name, url, description]).catch(err=>{throw err});
          return res.json(rows)
         
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  });
  
  
  
// API 삭제
router.delete('/', (req, res) => {
    const {api_id} = req.body;
    db( async (connection)=>{
      try{
          const rows = await query(connection, DELETE,[api_id]).catch(err=>{throw err});
          return res.json(rows)
          }catch(err){
              return res.status(500).json(err)
          }   
      });
  });
  
  

module.exports = router;