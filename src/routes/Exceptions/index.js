// index.js
const express   = require('express');
const router = express.Router();
const {newAction, selectAction,  listAction, deleteAction} = require("../../Action/");

// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {LIST, SELECT, NEW, DELETE} = require("../../query/Exceptions/");



// Exception 목록 조회 조회 
router.post('/',(req, res)=> {listAction(res,LIST);  });


// Exception 신규 등록
router.post('/new', (req, res)=>{  
    const {title, exceptions, deviceId} = req.body;
    newAction(res, NEW, [title, exceptions, deviceId]) ;
});


// Exception 상세조회
router.post('/:id', (req, res)=>{  
    const {id} =  req.params;
     selectAction(res, SELECT, [id]);
});


// Exception 삭제 
router.delete("/", (req, res)=>{  
    deleteAction(res, DELETE, ["TEST"]);
});



// Exception 삭제 
router.delete("/deleteAll", (req, res)=>{  
    deleteAction(res, DELETE, ["TEST"]);
});


module.exports = router;
