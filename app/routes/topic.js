var sessionAction = require('./common/sessionAction');
var logger = require('../middlewares/log/logging').logger;
var Topic = require('../models').Topic;
module.exports = function (app) {
    var loadJsCss = require('../middlewares/loadJsCss');

    app.get('/topic/new',function(req,res) {
        loadJsCss(req, res);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        if(input.user.is_login == true) {
            res.render('topic',input);
        }else {
            res.redirect('/login?to=/topic/new');
        }
    });
    //新建话题
    app.post('/topic/new',function(req,res) {
        var title = req.body.title.trim();
        var content = req.body.content;
        var tag = req.body.tag;
        var createBy = sessionAction.is_exist(req,res)._id;
        var createOn = new Date();
        Topic.addAndSave(title,content,tag,createBy,createOn,function(err) {
            if(err) {
                logger.log(err);
            }
            console.log('add topic success！');
            res.redirect('/');
        });
    });

    //topic详细页面
    app.get('/topic/:id',function(req,res) {
        loadJsCss(req,res);
        var id = req.params.id;
        //console.log(id);
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        Topic.findById(id,function(err,item) {
            if(err) {
                logger.log(err);
            }
            input.item = item;
            res.render('topic-detail',input);
        });
    });
    //通过标签找topic列表
    app.get('/tag/:tag',function(req,res) {
        loadJsCss(req,res);
        var tag = req.params.tag;
        var input = {};
        input.title = "09441";
        input.user = sessionAction.is_exist(req,res);
        input.tag = tag;
        Topic.listByTagName(tag,function(err,listByTag) {
            if(err) {
                logger.log(err);
            }
            input.listByTag = listByTag;
            res.render('topic-tag',input);
        });
    });
}