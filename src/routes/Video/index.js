// index.js
const express   = require('express');
const router = express.Router();
const dir = require("../../config").uploadFolder.video;

var fs = require('fs');
// 팀 목록 조회 조회 
router.post('/',(req, res)=> {


    console.log("hello")

    var files = fs.readdirSync(dir); // 디렉토리를 읽어온다
        console.log(files);
     
        return res.json({
                message : "정상 조회 되었습니다.",
                result : true,
                data : files
                
            
            })


});





module.exports = router;
