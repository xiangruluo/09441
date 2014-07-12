var loadJsCss = require('../../common/middleware/loadJsCss'),
    sessionAction = require('./common/sessionAction'),
    user = require('./user'),
    topic = require('./topic'),
    tag = require('./tag');

var Topic = require('../models').Topic;
var User = require('../models').User;

var logger = require('../../common/log/logging').logger;
module.exports = function(app) {
    //首页路由
    app.get('/',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        //console.log(req.session);
        Topic.listAll(function(err,list) {
            if(err) {
                console.error(err);
            }
            input.list = list;
            //console.log(input);
            res.render('index', input);
        });
    });
    //调用其他路由文件
    topic(app);
    user(app);
    tag(app);
};

