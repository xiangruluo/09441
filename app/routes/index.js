var loadJsCss = require('../middlewares/loadJsCss'),
    sessionAction = require('./common/sessionAction'),
    user = require('./user'),
    topic = require('./topic'),
    tag = require('./tag');
var moment = require('moment');
var Topic = require('../models').Topic;
var User = require('../models').User;
var timeFormat = require('../middlewares/timeFormat.js');
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
            var mydate= 'Tue Jul 22 2014 18:11:10 GMT+0800 (中国标准时间)';
            var date = new Date(Date.parse(mydate.replace(/-/g,   "/")));
            for(var i=0;i<list.length;i++) {
                list[i].createOn = timeFormat.format_date(date,true);
            }
            //console.log(new Date());
            console.log(list);
            console.log(timeFormat.format_date(new Date(),true));
            input.list = list;
            res.render('index', input);
        });
    });
    //调用其他路由文件
    topic(app);
    user(app);
    tag(app);
};

