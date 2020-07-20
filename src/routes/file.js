
const express = require("express");
const router = express.Router();

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, "test.jpg") // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  })
  var upload = multer({ storage: storage });

// 뷰 페이지 경로
router.get('/show', function(req, res, next) {
    res.render("board")
});

  
// 로그인 
router.get('/', (req, res) => {
    res.send("업로드 성공! ");
});

router.post('/upload', upload.single('userfile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });


module.exports = router;