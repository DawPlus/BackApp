
const express = require("express");
const router = express.Router();
const query = require('../util/query');
const db = require('../util/db_con');
const {isTokken, getTokken} = require("../util/tokken");
const {SELECT_ADMIN}  = require("../query/Admin");
var base64 = require('base-64');




// 로그인 
router.post('/login', (req, res) => {
  const {id, password} = req.body;
  const returnJson = {
        result : null, 
        message : "",
        data : null
      , 
  }

  db( async (connection)=>{
    try{
      const rows = await query(connection, SELECT_ADMIN, [id, base64.encode(password)]).catch(err=>{throw err});

      if(rows[0] === undefined){
            res.status(500)//
            returnJson.result = false;
            returnJson.message = "로그인중 오류가 발생했습니다." ;
            return res.json(returnJson);
      }
      
          const userInfo  = rows[0]; 
          const tokken    =  getTokken(userInfo);

          returnJson.result = true,
          returnJson.message = "정상적으로 로그인 됐습니다.";
          returnJson.data = {
            authrization : true
            , tokken     : tokken
            , userInfo 
        };

        return res.json(returnJson); 
    }catch(err){
      return res.status(500).json(err)
    }   
  });

});

// 토큰 확인
router.post("/check", (req, res) => {
     const {tokken} = req.body;
     const decoded = isTokken(tokken);
     const returnJson = {
          result : null, 
          message : "",
          data : null
        , 
    }

     if(!decoded) {
        returnJson.result = false;
        returnJson.message=" 유효하지 않은 토큰 입니다. ";
        returnJson.data={
            authrization : false
        }
        return res.status(500).json(returnJson);
      
      }      
      db( async (connection)=>{
        try{
          // 토근에 있는 UserInfo 
          const {admin_id, password} = decoded.userInfo;   
            
          const rows = await query(connection, SELECT_ADMIN, [admin_id, password]).catch(err=>{throw err});
      
            if(rows[0] === undefined){
                  res.status(500)//
                returnJson.message="사용자가 없습니다.";
                returnJson.result = false;
                returnJson.data= {
                  authrization : false
                }
                  return res.json(returnJson);
            }
                const userInfo  = rows[0]; 
                const tokken    =  getTokken(userInfo);
               
                returnJson.result = true;
                returnJson.message="새로고침 되었습니다.";
                returnJson.data = {
                  authrization : true
                  , tokken     : tokken
                  , userInfo 
              }


              return res.json(returnJson); 
          }catch(err){
            console.log(err);
            return res.status(500).json({authrization : false})
          }   
        });

      });
// //  로그아웃을 수행한다.
// //  사용중인 세션을 삭제 한다. 
// router.post("/logout", (req, res) => {
//   req.session.destroy(function(){ 
//       req.session;
//   });
//   return res.json({
//           data : {auth : false}
//   })
// });


// // 토큰을 검증한다. 
// router.post("/check", (req, res) => {
//    const {tokken} = req.body;
//     /* Query List */
//     const checkTokken = "SELECT USER_ID, NAME FROM USER WHERE USER_ID=? AND PASSWORD = ?";
//     const decoded = isTokken(tokken);
//     // 토근에 있는 UserInfo 
//     const {USER_ID, PASSWORD} = decoded.userInfo;   
//     db((connection) => {
//         connection.query(checkTokken,[USER_ID, PASSWORD], (err, rows) => {
//         // 연결세션 반환.
//         connection.release();
//         if (err) {
//           throw err;
//         }
//         if(rows[0] === undefined){
//           res.status(500)//
//           return res.json({error : "사용자가 음슴"})
//         }
//         const userInfo = rows[0]||{};

//         var jsonData = {
//           authrization    : rows.length > 0 ,
//                 tokken    : tokken,
//                 userInfo  : {
//                   userid  : userInfo.USER_ID,
//                   name    : userInfo.NAME
//             }
    
//         }

//       return res.json(jsonData); // 결과는 rows에 담아 전송
//     });
//   });
// });





module.exports = router;