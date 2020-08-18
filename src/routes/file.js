
const express = require("express");
const router = express.Router();
const path = require('path');
var mime = require('mime');
var fs = require('fs');
const query = require('../util/query');
const db = require('../util/db_con');
const {NEW, SUB} = require("../query/file");

const uploadFolder =  "src/uploads/map"
const urlPrefix = "/static/map/";



var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null,uploadFolder) // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  }
})
  var upload = multer({ storage: storage });

  
// 로그인 
router.get('/', (req, res) => {

  
  var files = fs.readdirSync("uploads/"); // 디렉토리를 읽어온다

  fs.unlink(`${"uploads/"}/1595298693540.jpg`,(err)=>{
    console.log(err)
  })
  return res.send({success : "true"})

});



router.post('/upload', upload.single('file'), (req, res) => {
  
  // Team ID  
  const {team_id}= req.body;
  // File Info 
  const {originalname, mimetype, destination, filename, path, size} = req.file;
  // File URL 
  const url = urlPrefix+filename;


  db( async (connection)=>{
    try{
        const row =  await query(connection
          , NEW
          ,[originalname, mimetype, destination, filename, path, size, team_id, url]
        ).catch(err=>{throw err});

          // SBU INSERT 
        db( async (connection)=>{
          try{
              const sub =  await query(connection
                , SUB
                ,[row.insertId, urlPrefix+filename]
              ).catch(err=>{throw err});
                  console.log(sub);
              }catch(err){
                  return res.status(500).json(err)
              }   
          });


          return res.json({
              url 
          })

        }catch(err){
            return res.status(500).json(err)
        }   
    });

  
   // console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });


router.get("/download/:file_name", function(req, res, next){

  var upload_folder = 'uploads/';
  var file = upload_folder + req.params.file_name; // ex) /upload/files/sample.txt
  try {
    if (fs.existsSync(file)) { // 파일이 존재하는지 체크
      // var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
      // var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
    
      // res.setHeader('Content-disposition', 'attachment; filename=' + filename); // 다운받아질 파일명 설정
      // res.setHeader('Content-type', mimetype); // 파일 형식 지정
    
      // var filestream = fs.createReadStream(file);
      // filestream.pipe(res);

      res.download(file);


    } else {
      res.send('해당 파일이 없습니다.');  
      return;
    }
  } catch (e) { // 에러 발생시
    console.log(e);
    res.send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
    return;
  }
})


module.exports = router;