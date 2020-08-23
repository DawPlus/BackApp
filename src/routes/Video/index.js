// index.js
const express   = require('express');
const router = express.Router();
const dir = "src/uploads/video";
var fs = require('fs');
// 팀 목록 조회 조회 
router.post('/',(req, res)=> {


    console.log("hello")

    var files = fs.readdirSync(dir); // 디렉토리를 읽어온다
        console.log(files);
     
        return res.json({
                files
                
            
            })


});





module.exports = router;
