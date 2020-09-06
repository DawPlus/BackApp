// index.js
const express   = require('express');
const router = express.Router();
const {selectAction,  listAction, deleteAction} = require("../../Action/");
const {listAllAction} = require("./ListAll");
const { newAction} = require("./New")
// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {LIST, SELECT, DELETE} = require("../../query/Question/");



// 문제 목록 조회 조회 
router.post('/',(req, res)=> listAction(res,LIST));



// App 에 보낼 문제목록 조회 
router.post('/listAll',(req, res)=> listAllAction(req, res));



// 문제 신규 등록
router.post('/new', (req, res)=>{  
    newAction(req, res) ;
});


// 문제 상세조회
router.get('/:id', (req, res)=>{  
    const {id} =  req.params;
     selectAction(res, SELECT, [id]);
});


// 문제 삭제 
router.delete("/:id", (req, res)=>{  
    const {id} =  req.params
    deleteAction(res, DELETE, [id]);
});
module.exports = router;
