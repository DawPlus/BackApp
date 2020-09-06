// index.js
const express   = require('express');
const router = express.Router();
const {newAction, listAction, deleteAction, selectAction} = require("../../Action/");

// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {LIST, NEW, DELETE,SELECT} = require("../../query/API/");

// API 목록 조회 조회 
router.post('/',(req, res)=> listAction(res,LIST));

//  API 신규 등록
router.post('/new', (req, res)=>{  
    const {name, url, description, method} = req.body;
    newAction(res, NEW, [name, url, description, method]) ;
});

// 팀 상세 조회 
router.post("/:id", (req, res)=>{  
    const {id} =  req.params
    selectAction(res, SELECT, [id]) ;
});

// API 삭제 
router.delete("/:id", (req, res)=>{  
    const {id} =  req.params
    deleteAction(res, DELETE, [id]);
});
module.exports = router;
