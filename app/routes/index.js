var loadJsCss = require('../middlewares/loadJsCss'),
    sessionAction = require('./common/sessionAction'),
    user = require('./user'),
    topic = require('./topic'),
    tag = require('./tag');
var Topic = require('../models').Topic;
var User = require('../models').User;
var timeFormat = require('../middlewares/timeFormat');
var logger = require('../middlewares/log/logging').logger;

module.exports = function(app) {
    //首页路由
    app.get('/',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        Topic.listAll(function(err,list) {
            if(err) {
                console.error(err);
            }
            for(var i=0;i<list.length;i++) {
                list[i].friendly_createOn = timeFormat.format_date(list[i].createOn,true);
            }
            input.list = list;
            res.render('index', input);
        });
    });
    //调用其他路由文件
    topic(app);
    user(app);
    tag(app);
};

