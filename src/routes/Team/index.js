// index.js
const express   = require('express');
const router = express.Router();
const listRouter = require("./List");
const newRouter = require("./New");
const selectRouter = require("./Select");
const updateRouter = require("./Update");
const deleteRouter = require("./Delete");

// API 목록 조회 조회 
router.post('/', listRouter);
router.post('/new', newRouter);
router.post('/:id', selectRouter);
router.put("/", updateRouter);
router.delete("/:id", deleteRouter);
module.exports = router;
