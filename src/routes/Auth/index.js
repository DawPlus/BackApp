// index.js
const express   = require('express');
const router = express.Router();
const {loginAction} = require("./Login");
const {checkTokkenAction} = require("./CheckTokken");

// 기본  CRUD  Template 사용 필요시 신규로 생성 
const {SELECT_ADMIN} = require("../../query/Admin");



// 권한조회
router.post('/login',(req, res)=>{
    const {id, password} = req.body; 
    loginAction(res, SELECT_ADMIN, {id, password});
});


// 토큰 검증 
router.post('/check', (req, res)=>{  
    const {tokken} = req.body;
    checkTokkenAction(res, SELECT_ADMIN, tokken) ;
});


module.exports = router;
