var logger = require('../../common/log/logging').logger;
var User = require('../models').User;

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
        var password = req.body.password.trim();
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
            console.log(user);
            if(user) {
                returnInfo.valid = 0;
                returnInfo.message = "该邮箱已被注册！";
            } else {
                returnInfo.valid = 1;
                returnInfo.message = "该邮箱可以使用！";
            }
            res.json(returnInfo);
        });

    });
};