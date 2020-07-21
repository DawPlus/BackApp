
const express = require("express");
const router = express.Router();
const path = require('path');

var fs = require('fs');


var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD,) // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  }
})
  var upload = multer({ storage: storage });

  
// 로그인 
router.get('/', (req, res) => {

  
  var files = fs.readdirSync(process.env.UPLOAD); // 디렉토리를 읽어온다
  console.log(files);


  // fs.unlink(`${process.env.UPLOAD}/1595298693540.jpg`,(err)=>{
  //   console.log(err)
  // })
  return res.send({success : "true"})

});

router.post('/upload', upload.single('file'), function(req, res){

  console.log(req.body);
  const {test, test2 }= req.body;
  console.log(test, test2);

    res.send({filePath : `http://localhost:3001/public/${req.file.filename}`})

    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });


module.exports = router;