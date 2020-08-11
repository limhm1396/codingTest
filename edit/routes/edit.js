const express = require('express');
const router = express.Router();
const multer = require("multer");

//뷰 페이지 경로
router.get('/musicList', function(req, res, next) {
    res.render('edit/musicList');
});

module.exports = router;