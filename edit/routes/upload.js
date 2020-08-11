const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const NodeID3 = require('node-id3');

async function dbInsert (tags, path) {
    try {
        await models.edit.create({
            fileName: tags.title,
            albumName: tags.album,
            artistName: tags.artist,
            filePath: path,
        })
        console.log('음원 추가 완료');
    } catch (err) {
        console.log('음원 추가 실패');
        console.error(err);
    }
}

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

//multer 미들웨어 등록
let upload = multer({
    storage: storage
})

//파일 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
    //파일 객체
    const file_metadata = req.file

    //DB 테이블 업로드
    const file_path = file_metadata.destination + file.originalname;
    const tags = NodeID3.read(file_path);
    dbInsert(tags, file);

    res.redirect(200, '/edit/musicList');
});

module.exports = router;