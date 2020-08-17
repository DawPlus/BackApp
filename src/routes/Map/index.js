// index.js
const express   = require('express');
const router = express.Router();
const path = require('path');
const { listAction, deleteAction, selectAction} = require("../../Action/");
const {uploadAction} = require("./Upload");


const uploadFolder =  "src/uploads/map"

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



// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {LIST, NEW, DELETE,SELECT} = require("../../query/map"); 

// 지도 목록 조회
router.post('/', (req, res)=> listAction(res, LIST));

//  API 신규 등록
router.post('/new', upload.single('file'), (req, res)=>{  
    uploadAction(req, res, NEW) ;
});

router.get("/:id", (req, res)=>{  
    const {id} =  req.params
    selectAction(res, SELECT, [id]) ;
});

// API 삭제 
router.delete("/:id", (req, res)=>{  
    const {id} =  req.params
    deleteAction(res, DELETE, [id]);
});

module.exports = router;
