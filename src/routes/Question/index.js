// index.js
const express   = require('express');
const router = express.Router();
const {newAction, selectAction,  listAction, deleteAction} = require("../../Action/");

// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {LIST, SELECT, NEW, DELETE} = require("../../query/Question/");



// Exception 목록 조회 조회 
router.post('/',(req, res)=> listAction(res,LIST));


// Exception 신규 등록
router.post('/new', (req, res)=>{  
    const {title, type, content, map , guide, video} = req.body;
    newAction(res, NEW, [title, exceptions, device_id]) ;
});


// Exception 상세조회
router.get('/:id', (req, res)=>{  
    const {id} =  req.params;
     selectAction(res, SELECT, [id]);
});


// Exception 삭제 
router.delete("/:id", (req, res)=>{  
    const {id} =  req.params
    deleteAction(res, DELETE, [id]);
});
module.exports = router;
