var logger = require('../../common/log/logging').logger;
var User = require('../models').User;
var crypto = require('crypto');
var sessionAction = require('./common/sessionAction');

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
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        input.to = req.query.to;
        res.render('signin',input);
    });

    //实现注册
    app.post('/signin/save',function(req, res) {
        var email = req.body.email;
        var password = MD5(req.body.password.trim());
        var to = req.body.to;
        console.log(to);
        User.addAndSave(email,password,function(err,user) {
            if(err) {
                logger.log(err);
            }
            console.log('register success!');
            sessionAction.push(user._id,user.email,req);
            if(!to) {
                res.redirect('/');
            }else {
                res.redirect(to);
            }

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
    //加载登录页面
    app.get('/login',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        input.to = req.query.to;
        res.render('login-normal',input);
    });
    //登录
    app.post('/login',function(req,res) {
        var email = req.body.email;
        var password = MD5(req.body.password);
        var to = req.body.to;
        User.login(email,password,function(err,user) {
            if(err) {
                logger.log(err);
            }
            if(user.length > 0) {
                console.log('login success!');
                sessionAction.push(user[0]['_id'],user[0]['email'],req);
                if(!to) {
                    res.redirect('/');
                }else {
                    res.redirect(to);
                }
            }else {
                console.log('login failed!');
                if(!to) {
                    res.redirect('/login');
                }else {
                    res.redirect('/login?to='+to);
                }
            }
        });
    });

    //登出(注销登录)
    app.get('/logout',function(req,res) {
        var logout = sessionAction.clear(req);
        if(logout == true) {
            res.redirect('/');
        }
    });

    //用户个人首页
    app.get('/user/:id',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        console.log(input.user);
        if(input.user.is_login == true) {
            res.render('user',input);
        }else {
            res.redirect('/login');
        }

    });
};