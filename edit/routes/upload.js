const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require("multer");
const fs = require('fs');
const path = require("path");
const NodeID3 = require('node-id3');

async function dbInsert (tags, path) {
    try {
        await models.edit.create({
            fileName: tags.originalFilename,
            albumName: tags.album,
            artistName: tags.artist,
            filePath: path,
        })
        console.log('음원 추가 완료');
    } catch (err) {
        console.log('음원 추가 실패');
        console.error(err);
        res.redirect(500, '/edit/musicList');
    }
}

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + extension);
    }
});

//multer 미들웨어 등록
let upload = multer({
    storage: storage
})

//음원 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
    //파일 객체
    const file_metadata = req.file

    //DB 테이블 업로드
    const file_path = file_metadata.path;
    const tags = NodeID3.read(file_path);
    tags.originalFilename = file_metadata.filename;

    dbInsert(tags, file_path);

    res.redirect(200, '/edit/musicList');
});

//음원 수정 업로드 처리
router.post('/update/:id', upload.single("imgFile"), async function(req, res, next) {
    try {
        const postId = req.params.id;

        //파일 객체
        const file_metadata = req.file

        const filePath = await models.edit.findOne({
            attributes: ['filePath'],
        }, {
            where: { id: postId },
        });

        //DB 테이블 업로드
        const file_path = file_metadata.path;

        fs.unlink(filePath.filePath, (err) => {
            console.error(err);
        });

        await models.edit.update({
            filePath: file_path,
        }, {
            where: { id: postId }
        });

        let postID = req.params.id;

        const result = await models.edit.findAll({
            attributes: ['id', 'fileName', 'albumName', 'artistName'],
        })
        res.render("edit/musicList", {
            posts: result
        });
    } catch (err) {
        console.error(err);
        res.redirect(500, '/edit/musicEdit');
    }
});

module.exports = router;