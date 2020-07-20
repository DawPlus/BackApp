
const express = require("express");
const router = express.Router();
const query = require('../util/query');
const db = require('../util/db_con');
const {LIST, ONE, ADD } = require("../query/question");






// 등록 
router.put('/', (req, res) => {
  const {title, content, update_user} = req.body;
  db( async (connection)=>{
  try{
      const rows = await query(connection, add,[title, content, update_user]).catch(err=>{throw err});
      console.log(rows);
      if(rows[0] === undefined){
            return res.json({})
      }
      
        return res.json({
            list : rows
        }); 
    }catch(err){
      return res.status(500).json(err)
    }   
  });

});





// 목록 조회 조회 
router.post('/list', (req, res) => {
  db( async (connection)=>{
  try{
      const rows = await query(connection, list).catch(err=>{throw err});
      
      if(rows[0] === undefined){
            return res.json({})
      }
      
        return res.json({
            list : rows
        }); 
    }catch(err){
      return res.status(500).json(err)
    }   
  });

});



// 목록 상세 조회 
router.post('/list/:id', (req, res) => {

    const {id} =  req.params;
    db( async (connection)=>{
    try{
        const rows = await query(connection, one,[id]).catch(err=>{throw err});
        
        if(rows[0] === undefined){
              return res.json({})
        }
        
          return res.json({
              list : rows
          }); 
      }catch(err){
        return res.status(500).json(err)
      }   
    });
  
  });
  
module.exports = router;