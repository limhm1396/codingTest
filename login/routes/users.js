var express = require('express');
var router = express.Router();
const models = require("../models");
const crypto = require('crypto');
require('date-utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("user/login");
});

//signUp
router.get('/signUp?', function(req, res, next) {
  res.render("user/signUp");
});


router.get('/signUp', function(req, res, next) {
  res.render("user/signUp");
});

router.post("/signUp", async function(req,res,next){
  try {
    let body = req.body;

    if (body.name !== '' && body.id !== '' && body.password !== '') {
      console.log('body', body);
      console.log('req.body : ', req.body);

      let inputPassword = body.password;
      let salt = Math.round((new Date().valueOf() * Math.random())) + "";
      let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");

      await models.user.create({
      name: body.userName,
      id: body.userId,
      password: hashPassword,
      salt: salt
      });
      res.redirect(200, "/users/login");
    }
    else {
      res.redirect(500, '/users/signUp');
    }
  } catch (err) {
    res.redirect(500, "/users/signUp");
  }
});

//login
router.get('/login', function(req, res, next) {
    let session = req.session;

    res.render("user/login", {
        session : session
    });
});

router.post("/login", async function(req,res,next){
    let body = req.body;

    if (body.userId == '' || body.password == '') {
        res.redirect(500, '/users/login');
    }
    else {
    	let result = await models.user.findOne({
 	where: {
        id : body.userId
    	}
    });

    if (result != null) {
        let dbPassword = result.dataValues.password;
        let inputPassword = body.password;
        let salt = result.dataValues.salt;
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");

        if(dbPassword === hashPassword){
            console.log("비밀번호 일치");
            // 세션 설정
            req.session.userName = result.dataValues.name;
            req.session.userId = body.userId;
            req.session.password = body.password;
            res.redirect(200, "/users/userPage");
        }
        else{
            console.log("비밀번호 불일치");
            res.redirect(500, "/users/login");
        }
     } else {
           res.redirect(500, '/users/login');
     }
    }
});

//userPage
router.get('/userPage', function(req, res, next) {
    let session = req.session;

    res.render("user/userPage", {
        session : session
    });
});

router.get("/logout?", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/users/login")
})

//userPwUpdate
router.get('/userPwUpdate?', function(req, res, next) {
    let session = req.session;

    res.render("user/userPwUpdate", {
        session : session
    });
});

router.post("/userPwUpdate", async function(req,res,next){
    try {
        let body = req.body;

        let result = await models.user.findOne({
        	where: {
            	id : req.session.userId
        	}
        });
    
        let dbPassword = result.dataValues.password;
        let inputPassword = body.password;
        let salt = result.dataValues.salt;
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");

        let newDate = new Date();
	let time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

        if(dbPassword == hashPassword && body.newPassword == body.againPassword){
            let inputPassword = body.newPassword;
            let salt = Math.round((new Date().valueOf() * Math.random())) + "";
            let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("base64");

            let result = await models.user.update({
                    password: hashPassword,
                    salt: salt,
                    updateAt: time
            }, {
                 where: {id : req.session.userId},
            });
            res.redirect(200, '/users/userPage');
        }
        else{
            res.redirect(500, '/users/userPwUpdate');
        }
        } catch (err) {
            console.error(err);
        }
});

module.exports = router;
