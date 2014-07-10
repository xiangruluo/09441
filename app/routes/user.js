var logger = require('../../common/log/logging').logger;
var User = require('../models').User;
var crypto = require('crypto');

//加密方法
var MD5 = function(password) {
    var md5 = crypto.createHash('md5');
    md5.update(password);
    password = md5.digest('hex');
    return password;
};

module.exports = function (app) {
    var loadJsCss = require('../../common/middleware/loadJsCss');

    //加载注册页面
    app.get('/signin',function(req, res) {
        loadJsCss(req, res);
        res.render('signin',{
            title:'09441'
        });
    });

    //实现注册
    app.post('/signin/save',function(req, res) {
        var email = req.body.email;
        var password = MD5(req.body.password.trim());
        User.addAndSave(email,password,function(err) {
            if(err) {
                logger.log(err);
            }
            console.log('register success!');
            res.redirect('/');
        });
    });

    //判断email是否已经被注册
    app.get('/signin/check_email',function(req,res) {
        var email = req.query.value;
        //定义返回json
        var returnInfo = {
            value: email,
            valid: '',
            message: ''
        };
        User.findByEmail(email,function(err,user) {
            if(err) {
                logger.log(err);
            }
            //console.log(user);
            if(user.length == 0) {
                returnInfo.valid = 1;
                returnInfo.message = "该邮箱可以使用！";
            } else {
                returnInfo.valid = 0;
                returnInfo.message = "该邮箱已被注册！";
            }
            res.json(returnInfo);
        });

    });

    //登录
    app.post('/login',function(req,res) {
        var email = req.body.email;
        var password = MD5(req.body.password);
        User.login(email,password,function(err,user) {
            if(err) {
                logger.log(err);
            }
            //console.log(user);
            if(user.length > 0) {
                console.log('login success!');
                res.redirect('/');
            }else {
                console.log('login failed!');
                res.redirect('/');
            }
        });
    });
};