// index.js
const express   = require('express');
const router = express.Router();

const {newAction, selectAction,  listAction,  updateAction} = require("../../Action/");
const { deleteAction} = require("./Delete");
const {LIST, NEW, SELECT, UPDATE, DELETE}  = require("../../query/Team");

// 팀 목록 조회 조회 
router.post('/',(req, res)=> listAction(res,LIST));


// 팀 신규등록
router.post('/new', (req, res)=>{  
    const {team, manager, phone} = req.body;
    newAction(res, NEW, [team, manager, phone]) ;
});


// 팀 상세조회
router.post('/:id', (req, res)=>{  
    const {id} =  req.params;
     selectAction(res, SELECT, [id]);
});


// 팀 삭제 
router.delete("/:id", (req, res)=>{  

    const {id} =  req.params
    
    deleteAction(req, res, id);
});

// 팀 수정
router.put('/', (req, res)=>{  
    const {team, manager, phone, id} = req.body;
    updateAction(res, UPDATE, [team, manager, phone, id]) ;
});

module.exports = router;
