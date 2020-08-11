const express = require('express');
const router = express.Router();
const multer = require("multer");

//뷰 페이지 경로
router.get('/musicList', async function(req, res, next) {
    try {
        const result = await models.post.findAll({
            attributes: ['id', 'fileName', 'albumName', 'artistName'],
        })
        res.render("edit/musicList", {
            posts: result
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;