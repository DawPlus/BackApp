// index.js
const express   = require('express');
const router = express.Router();
const auth      = require("./auth");
const question = require("./question");
const file      =require("./file");
const init      =require("./init");

// 인증(로그인 / 로그아웃 , 토큰 발행)
router.use('/auth', auth);
router.use('/question', question);
router.use('/file', file);
router.use('/init', init);

module.exports = router;
