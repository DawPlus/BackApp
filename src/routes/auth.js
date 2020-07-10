
const express = require("express");
const router = express.Router();
const query = require('../util/query');
const db = require('../util/db_con');
const {isTokken, getTokken} = require("../util/tokken");
const base64 =  require("js-base64").Base64;

// 로그인 
router.post('/login', (req, res) => {
  const {id, password} = req.body;
  console.log(id, password)
  const login = "SELECT ID, NAME, PASSWORD FROM USER WHERE ID=? AND PASSWORD = ?";
  db( async (connection)=>{
  try{
      const rows = await query(connection, login, [id, base64.encode(password)]).catch(err=>{throw err});

      if(rows[0] === undefined){
            res.status(500)//
            return res.json({error : "사용자가 없습니다."})
      }
          const userInfo  = rows[0]||{}; 
          const tokken    =  getTokken(userInfo);
          const jsonData  = {
                authrization : true
                , tokken     : tokken
                , userInfo : {
                    userid : userInfo.ID
                    , name : userInfo.NAME
                }
            };
        return res.json(jsonData); 
    }catch(err){
      return res.status(500).json(err)
    }   
  });

});

// 토큰 확인
router.post("/check", (req, res) => {
     const {tokken} = req.body;
      /* Query List */
      const check = "SELECT ID, NAME, PASSWORD FROM USER WHERE ID=? AND PASSWORD = ?";
      
      
      db( async (connection)=>{
        try{
          const decoded = isTokken(tokken);
          console.log(decoded.userInfo)
          // 토근에 있는 UserInfo 
          const {ID, PASSWORD} = decoded.userInfo;   


          const rows = await query(connection, check, [ID, PASSWORD]).catch(err=>{throw err});
      
            if(rows[0] === undefined){
                  res.status(500)//
                  return res.json({error : "사용자가 없습니다.",
                  authrization : true
                })
            }
                const userInfo  = rows[0]||{}; 
                const tokken    =  getTokken(userInfo);
                const jsonData  = {
                      authrization : true
                      , tokken     : tokken
                      , userInfo : {
                          userid : userInfo.ID
                          , name : userInfo.NAME
                      }
                  };
              return res.json(jsonData); 
          }catch(err){
            console.log("문제잇다");
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