const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const NodeID3 = require('node-id3');

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "."+ extension);
    }
});

async function dbInsert (tags, storage) {
    try {
        await models.edit.create({
            fileName: tags.title,
            albumName: tags.album,
            artistName: tags.artist,
            filePath: storage,
        })
        console.log('음원 추가 완료');
    } catch (err) {
        console.log('음원 추가 실패');
        console.error(err);
    }
}

//multer 미들웨어 등록
let upload = async function() {
    try {
        await multer({
            storage: storage
        });
        const file = storage;
        let tags = await NodeID3.read(file);
        dbInsert(tags, storage);
    } catch (err) {
        console.error(err);
    }
}

//파일 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
    //파일 객체
    let file = req.file

    //파일 정보
    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    res.redirect(200, '/edit/musicList');
});

module.exports = router;