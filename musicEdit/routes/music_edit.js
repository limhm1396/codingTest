const express = require('express');
const MusicEdit = require('../models/music_edit');

const router = express.Router();

router.get('/musicEdit', function (req, rex, next) {
    res.render('/music/musicList');
});

router.get('/:id/lists', async (req, res, next) => {
    try {
        const list = await MusicEdit.findAll({
            attributes: ['filename', 'albumName', 'artistName'],
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;