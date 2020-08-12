const express = require('express');
const models = require('../models');
const router = express.Router();
const NodeID3 = require('node-id3');
const fs = require('fs');
const path = require("path");

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

router.get('/ascList', async function(req, res, next) {
    try {
        const result = await models.edit.findAll({
            attributes: ['id', 'fileName', 'albumName', 'artistName'],
            order: [['fileName', 'ASC']],
        });
        res.render("edit/musicList", {
            posts: result
        });
    } catch (err) {
        console.error(err);
    }
});

router.post('/saerchList', async function(req, res, next) {
    try {
        const result = await models.edit.findAll({
            attributes: ['id', 'fileName', 'albumName', 'artistName'],
        }, {
            where: {
                fileName: req.body.searchName,
            }
        });
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
        const postId = req.params.id;

        const result = await models.edit.findOne({
            where: { id: postId }
        });

        res.render('edit/musicEdit', {
            post: result,
        });
    } catch (err) {
        console.error(err);
    }
});

router.put('/musicEdit/:id', async function(req, res, next) {
    try {
        const postId = req.params.id;
        const body = req.body;

        await models.edit.update({
            fileName: body.editFileName,
            albumName: body.editAlbumName,
            artistName: body.editArtistName,
        }, {
            where: { id: postId }
        })
  
        const filePath = await models.edit.findOne({
          attributes: ['filePath'],
        }, {
            where: {
                id: postId
            }
        });

        const tags = {
            originalFilename: body.editFileName,
            album: body.editAlbumName,
            artist: body.editArtistName,
        }
        
        await NodeID3.write(tags, filePath);

        console.log('음원 수정 완료');
        res.redirect(200, '/edit/musicList');
    } catch (err) {
        console.error(err);
    }
});

router.delete('/musicList/:id', async function(req, res, next) {
    try {
    let postId = req.params.id;

    const filePath = await models.edit.findOne({
        attributes: ['filePath'],
    }, {
        where: {id: postId}
    })
  
    await models.edit.destroy({
      where: {id: postId}
    })

    console.log('filePath : ', filePath.filePath);
    console.log('readdir : ', fs.readdirSync('/home/ubuntu/codingTest/edit/upload'));
    fs.unlinkSync('/home/ubuntu/codingTest/edit/' + filePath.filePath);

    res.redirect(200,'/edit/musicList');
    } catch (err) {
      console.error(err);
    }
});

module.exports = router;