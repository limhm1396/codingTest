const express = require('express');
const models = require('../models');
const router = express.Router();

//뷰 페이지 경로
router.get('/musicList', async function(req, res, next) {
    try {
        const result = await models.edit.findAll({
            attributes: ['id', 'fileName', 'albumName', 'artistName'],
        })
        res.render("edit/musicList", {
            posts: result
        });
    } catch (err) {
        console.error(err);
    }
});

//수정
router.get('/musicEdit/:id', async function(req, res, next) {
    try {
        let postID = req.params.id;
  
        const result = await models.edit.findOne({
          where: {id: postID}
        });

        res.render('edit/musicEdit', {
            post: result
          });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;