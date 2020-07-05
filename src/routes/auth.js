
const express = require("express");
const router = express.Router();

const db = require("../connect");
const {isTokken, getTokken} = require("../config");
const base64 =  require("js-base64").Base64;

// 로그인을 수행한다.
router.post("/login", (req, res) => {
  // Param
  const {userid, password} = req.body;
  // Query 
  const login = "SELECT USER_ID, NAME, PASSWORD FROM USER WHERE USER_ID=? AND PASSWORD = ?";
  db( (connection) => {

      connection.query(login, [userid, base64.encode(password)], (err, rows) => {

        connection.release(); // 연결세션 반환.
        if (err) {
          res.status(500);
          return res.json({error :err }) ;
        }

        if(rows[0] === undefined){
          res.status(500)//
          return res.json({error : "사용자가 음슴"})
        }

        const userInfo  = rows[0]||{}; 
        const tokken    =  getTokken(userInfo);
        const jsonData  = {
              authrization : true
              , tokken     : tokken
              , userInfo : {
                  userid : userInfo.USER_ID
                  , name : userInfo.NAME
              }
          };

       return res.json(jsonData); 
    });
  });
});

//  로그아웃을 수행한다.
//  사용중인 세션을 삭제 한다. 
router.post("/logout", (req, res) => {
  req.session.destroy(function(){ 
      req.session;
  });
  return res.json({
          data : {auth : false}
  })
});


// 토큰을 검증한다. 
router.post("/check", (req, res) => {
   const {tokken} = req.body;
    /* Query List */
    const checkTokken = "SELECT USER_ID, NAME FROM USER WHERE USER_ID=? AND PASSWORD = ?";
    const decoded = isTokken(tokken);
    // 토근에 있는 UserInfo 
    const {USER_ID, PASSWORD} = decoded.userInfo;   
    db((connection) => {
        connection.query(checkTokken,[USER_ID, PASSWORD], (err, rows) => {
        // 연결세션 반환.
        connection.release();
        if (err) {
          throw err;
        }
        if(rows[0] === undefined){
          res.status(500)//
          return res.json({error : "사용자가 음슴"})
        }
        const userInfo = rows[0]||{};

        var jsonData = {
          authrization    : rows.length > 0 ,
                tokken    : tokken,
                userInfo  : {
                  userid  : userInfo.USER_ID,
                  name    : userInfo.NAME
            }
    
        }

      return res.json(jsonData); // 결과는 rows에 담아 전송
    });
  });
});





module.exports = router;