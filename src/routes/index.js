// index.js
const express   = require('express');
const router = express.Router();
const auth          =   require("./Auth");
const question      =   require("./question");
const file          =   require("./file");
const init          =   require("./Init");
const exceptions    =   require("./Exceptions");
const map           =   require("./Map");
const team          =   require("./Team");



// 인증(로그인 / 로그아웃 , 토큰 발행)
router.use('/auth', auth);



router.use('/question', question);
router.use('/file', file);



// 지도관리
router.use('/map', map);

// API 관리
router.use('/init', init);

// 오류 관리 
router.use('/exceptions', exceptions);

// 팀관리 
router.use('/team', team);


module.exports = router;
