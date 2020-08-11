const express = require('express');
const models = require('../models');
const router = express.Router();
const NodeID3 = require('node-id3');
const fs = require('fs');

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
        const postId = req.params.id;
        const body = req.body;

        await models.edit.update({
            filaName: body.editFileName,
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
            title: body.editFileName,
            album: body.editAlbumName,
            artist: body.editArtistName,
        }
        
        await NodeID3.update(tags, filePath);

        fs.rename(filePath, body.editFileName);

        console.log('음원 수정 완료');
        res.redirect('/edit');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;