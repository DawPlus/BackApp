// index.js
const express   = require('express');
const router = express.Router();

const auth      = require("./auth");

// 인증(로그인 / 로그아웃 , 토큰 발행)
router.use('/auth', auth);

module.exports = router;
