var express = require('express');
var router = express.Router();
const MuslcEdit = require('../models/music_edit');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const musicEdit = await MuslcEdit.findAll();
    res.render('sequelize', { musicEdit });
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;
