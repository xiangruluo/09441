var logger = require('../middlewares/log/logging').logger;
var crypto = require('crypto');
var sessionAction = require('./common/sessionAction');
var timeFormat = require('../middlewares/timeFormat');
var User = require('../models').User;
var Topic = require('../models').Topic;
//加密方法
var MD5 = function(password) {
    var md5 = crypto.createHash('md5');
    md5.update(password);
    password = md5.digest('hex');
    return password;
};

module.exports = function (app) {
    var loadJsCss = require('../middlewares/loadJsCss');
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
        var nickname = req.body.nickname;
        var to = req.body.to;
        console.log(to);
        User.addAndSave(email,password,nickname,function(err,user) {
            if(err) {
                logger.log(err);
            }
            console.log('register success!');
            sessionAction.push(user._id,user.email,user.nickname,req);
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
    //判断nickname是否被使用
    app.get('/signin/check_nickname',function(req,res) {
        var nickname = req.query.value;
        //定义返回json
        var returnInfo = {
            value: nickname,
            valid: '',
            message: ''
        };
        User.findByNickname(nickname,function(err,user) {
            if(err) {
                logger.log(err);
            }
            //console.log(user);
            if(user.length == 0) {
                returnInfo.valid = 1;
                returnInfo.message = "该昵称可以使用！";
            } else {
                returnInfo.valid = 0;
                returnInfo.message = "该昵称已被注册！";
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
        input.err = req.query.err || '';
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
                sessionAction.push(user[0]['_id'],user[0]['email'],user[0]['nickname'],req);
                if(!to) {
                    res.redirect('/');
                }else {
                    res.redirect(to);
                }
            }else {
                console.log('login failed!');
                if(!to) {
                    res.redirect('/login?err=1');
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
        Topic.listByUserId(req.params.id,function(err,list) {
            if(err) {
                logger.log(err);
            }
            input.list = list;
            for(var i=0;i<list.length;i++) {
                var item = list[i];
                item.friendly_createOn = timeFormat.format_date(item.createOn,true);
            }
            if(input.user.is_login == true) {
                res.render('user',input);
            }else {
                res.redirect('/login');
            }
        });
    });


    //加载修改个人发布的话题页面
    app.get('/topic/:id/edit',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        var id = req.params.id;
        Topic.findById(id,function(err,item) {
            input.item = item;
            item.friendly_createOn = timeFormat.format_date(item.createOn,true);
            if(input.user.is_login == true) {
                res.render('topic-edit',input);
            }else {
                res.redirect('/login');
            }
        });
    });

    //修改个人发布的话题
    app.post('/topic/:id/edit',function(req,res) {
        Topic.update(req.body.id,req.body,function(err,item) {
            if(err) {
                logger.log(err);
            }
            res.redirect('/topic/' + item._id);
        });
    });

    //账号设置首页
    app.get('/account',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        if(input.user.is_login == true) {
            res.render('account',input);
        }else {
            res.redirect('/login');
        }
    });
};