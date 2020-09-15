// index.js
const express   = require('express');
const router = express.Router();
const {listAction, deleteAction} = require("../../Action/");
const {listAllAction} = require("./ListAll");
const {newAction} = require("./New");
const {selectAction} = require("./Select");
const {updateUseYNAction, updateAction, updateExamAction} = require("./Update");


// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {ADMIN_LIST,  DELETE} = require("../../query/Question/");



// 문제 목록 조회 조회 
router.post('/',(req, res)=> listAction(res,ADMIN_LIST));



// App 에 보낼 문제목록 조회 
router.post('/listAll',(req, res)=> listAllAction(req, res));



// 문제 신규 등록
router.post('/new', (req, res)=>{  
    newAction(req, res) ;
});


// 문제 상세조회
router.post('/:id', (req, res)=>{  
    const {id}  = req.params;
     selectAction(req, res);
});


// 문제 삭제 
router.delete("/:id", (req, res)=>{  
    const {id} = req.params;
    if(id === undefined) return res.json({message : "삭제중 오류가 발생하였습니다.", result : false});
    deleteAction(res, DELETE, [id]);
});


// 사용여부 수정 
router.put("/use", (req, res)=>{
    updateUseYNAction(req, res);
});



// 문제수정
router.put("/", (req,res) =>{
    updateAction(req, res);
});

// 보기수정
router.put("/exam", (req,res) =>{
    updateExamAction(req, res);
});

module.exports = router;
