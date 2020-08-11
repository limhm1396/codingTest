const express = require('express');
const MusicEdit = require('../models/music_edit');
const multer = require('multer');

const router = express.Router();

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

//업로드
let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "." + extension);
    }
})

let upload = multer({
    storage: storage
})

// 뷰 페이지 경로
router.get('/', function(req, res, next) {
    res.render("musicList");
});

// 2. 파일 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
    // 3. 파일 객체
    let file = req.file

    // 4. 파일 정보
    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    res.json(result);
});

module.exports = router;